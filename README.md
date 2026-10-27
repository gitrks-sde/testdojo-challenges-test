# TestDojo automation challenges

Real Playwright automation against [TestDojo](https://testdojo.testverse.workers.dev), checked by
the official TestDojo checks in GitHub Actions. Challenge details and hints are on the
[Challenges page](https://testdojo.testverse.workers.dev/challenges).

| # | Challenge | Level | Your file |
|---|---|---|---|
| 01 | Registration Rookie | Easy | `solutions/challenge-01-registration.ts` |
| 02 | First Purchase | Easy | `solutions/challenge-02-first-purchase.ts` |
| 03 | Bargain Hunter | Moderate | `solutions/challenge-03-bargain-hunter.ts` |
| 04 | Locked Out | Moderate | `solutions/challenge-04-locked-out.ts` |

## 1. Open your repo in Codespaces

**Code → Codespaces → Create codespace on main.** A full editor opens in your browser, and
Playwright installs itself the first time (a few minutes). Nothing to install on your machine.

<details>
<summary>Prefer your own machine?</summary>

Install [Node.js 22 or newer](https://nodejs.org) and Git, clone this repo, then run:

```bash
npm install
npx playwright install chromium
```
</details>

## 2. Write your solution

Each file in `solutions/` has one function to complete. It receives a Playwright
[`page`](https://playwright.dev/docs/api/class-page) that's already pointed at TestDojo, so
relative URLs work:

```ts
await page.goto('/flows/shop.html');
```

You can use anything Playwright offers, including `expect` for waiting:

```ts
import { expect, type Page } from '@playwright/test';
```

## 3. Run the checks

```bash
npm test                              # all four challenges
npm test -- --grep "Challenge 02"     # just one
npm run report                        # open the last HTML report
```

The checks are downloaded fresh on every run from
[`testdojo-dev/challenge-checks`](https://github.com/testdojo-dev/challenge-checks). Read them
to see exactly what's verified; you can't change them, and neither can anyone else.

## 4. Commit and push

Every push runs the official checks in GitHub Actions (the **Actions** tab). See your results on
the [Challenges page](https://testdojo.testverse.workers.dev/challenges): enter your GitHub
username, and each challenge shows Passed, Failed or Running. Pass all four to earn the
**Dojo Challenger** badge.

> Don't edit `.github/workflows/challenges.yml`. Results only count when that workflow is
> exactly the one from the template.

## Rules

- Your repo must be **public**, so the checks run for free and the Challenges page can read them.
- Solve each challenge through the site, the way a real test would. The checks confirm you went
  through the right pages.
