// REFERENCE SOLUTION. Never publish: used only to prove the checks pass.
import { expect, type Page } from '@playwright/test';

export async function lockedOut(page: Page): Promise<void> {
  await page.goto('/flows/login.html');
  const email = page.getByLabel('Email');
  const password = page.getByLabel('Password');
  const signIn = page.getByRole('button', { name: 'Sign In' });

  for (let attempt = 1; attempt <= 3; attempt++) {
    await email.fill('demo@test.com');
    await password.fill('wrong-password');
    await signIn.click();
  }
  await expect(signIn).toBeDisabled();

  // The lockout lasts about 10 seconds; wait for the form to unlock.
  await expect(signIn).toBeEnabled({ timeout: 20_000 });
  await email.fill('demo@test.com');
  await password.fill('Test1234');
  await signIn.click();
  await page.waitForURL(/login-dashboard/);
}
