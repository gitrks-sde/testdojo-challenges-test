// Runs the official TestDojo checks against your solutions:
//   npm test                               all challenges
//   npm test -- --grep "Challenge 02"      just one
//
// Each run downloads a fresh copy of the checks, so they're always the same
// ones GitHub Actions uses. (Actions doesn't run this script; it fetches the
// checks itself, so editing this file can't change your official result.)
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECKS = join(ROOT, '.challenge-checks');
const DOWNLOAD = join(ROOT, '.challenge-checks-download');
const CHECKS_REPO = 'https://github.com/testdojo-dev/challenge-checks.git';
const isWindows = process.platform === 'win32';

function run(command, args, cwd, useShell = false) {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit', shell: useShell });
  if (result.error) {
    console.error(`Couldn't run ${command}: ${result.error.message}`);
    return 1;
  }
  return result.status ?? 1;
}

// npm/npx are .cmd scripts on Windows, which need a shell; quote every argument.
function runNpm(commandLine, cwd) {
  return run(commandLine, [], cwd, true);
}

function installedPlaywrightVersion() {
  const file = join(CHECKS, 'node_modules', '@playwright', 'test', 'package.json');
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')).version : null;
}

// 1. Fresh official checks. node_modules is kept between runs so it stays fast.
console.log('Downloading the official checks...');
rmSync(DOWNLOAD, { recursive: true, force: true });
if (run('git', ['clone', '--depth', '1', '--quiet', CHECKS_REPO, DOWNLOAD], ROOT) !== 0) {
  console.error('Could not download the checks. Check your internet connection and try again.');
  process.exit(1);
}
mkdirSync(CHECKS, { recursive: true });
for (const entry of readdirSync(CHECKS)) {
  if (entry !== 'node_modules') rmSync(join(CHECKS, entry), { recursive: true, force: true });
}
for (const entry of readdirSync(DOWNLOAD)) {
  if (entry !== '.git') cpSync(join(DOWNLOAD, entry), join(CHECKS, entry), { recursive: true });
}
rmSync(DOWNLOAD, { recursive: true, force: true });

// 2. Install the checks' dependencies when missing or when the checks need a new version.
const wanted = JSON.parse(readFileSync(join(CHECKS, 'package.json'), 'utf8')).devDependencies['@playwright/test'];
if (installedPlaywrightVersion() !== wanted) {
  console.log(`Installing Playwright ${wanted} for the checks (first run only)...`);
  if (runNpm('npm install --no-audit --no-fund --loglevel=error', CHECKS) !== 0) process.exit(1);
}
if (runNpm('npx playwright install chromium', CHECKS) !== 0) process.exit(1);

// 3. Your solutions go next to the checks, which import them.
rmSync(join(CHECKS, 'solutions'), { recursive: true, force: true });
cpSync(join(ROOT, 'solutions'), join(CHECKS, 'solutions'), { recursive: true });

// 4. Run the checks, passing through any extra arguments (e.g. --grep).
const extra = process.argv.slice(2).map((arg) => (isWindows ? `"${arg.replace(/"/g, '\\"')}"` : `'${arg.replace(/'/g, `'\\''`)}'`));
process.exit(runNpm(['npx playwright test', ...extra].join(' '), CHECKS));
