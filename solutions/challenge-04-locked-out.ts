import type { Page } from '@playwright/test';

/**
 * Challenge 04 · Locked Out (Moderate)
 * Page: Flows › Login → await page.goto('/flows/login.html')
 *
 * 1. Fail to sign in three times with a wrong password, so the form locks.
 * 2. Wait for the lockout to end. No fixed sleeps: wait for the form to unlock.
 * 3. Sign in with the demo credentials shown on the page and finish on the dashboard.
 *
 * Full details and a hint: https://testdojo.testverse.workers.dev/challenges
 */
export async function lockedOut(page: Page): Promise<void> {
  // Your automation goes here.
  throw new Error('Challenge 04 is not solved yet');
}
