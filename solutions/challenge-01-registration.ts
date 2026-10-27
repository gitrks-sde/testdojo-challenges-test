// REFERENCE SOLUTION. Never publish: used only to prove the checks pass.
import { expect, type Page } from '@playwright/test';

export async function registrationRookie(page: Page): Promise<void> {
  await page.goto('/elements/forms.html');
  await page.getByLabel('Full Name').fill('Asha Verma');
  await page.getByLabel('Email').fill('asha.verma@example.com');
  await page.getByLabel('Password', { exact: true }).fill('Secret123');
  await page.getByLabel('Confirm Password').fill('Secret123');
  await page.getByLabel('Phone').fill('9876543210');
  await page.getByLabel('Date of Birth').fill('1998-04-21');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.locator('#form-summary')).toHaveText('Account created successfully!');

  await page.getByPlaceholder('Search a country').fill('Ind');
  await page.locator('#autosuggest-menu').getByText('India', { exact: true }).click();
  await expect(page.locator('#form-autosuggest-status strong')).toHaveText('India');
}
