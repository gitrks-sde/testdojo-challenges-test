// REFERENCE SOLUTION. Never publish: used only to prove the checks pass.
import { expect, type Page } from '@playwright/test';
import { fillShipping, payAndConfirm } from './checkout-helpers';

export async function bargainHunter(page: Page): Promise<string> {
  await page.goto('/flows/shop.html');
  await page.getByLabel('Category').selectOption('Audio');
  await page.getByLabel('In stock only').check();
  await page.getByLabel('Sort by').selectOption('price-asc');

  const cheapest = page.locator('.product-card').first();
  await cheapest.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.getByTestId('cart-count')).toHaveText('1');
  await page.getByRole('button', { name: 'Proceed to checkout' }).click();

  await page.getByLabel('Promo code').fill('DOJO10');
  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('#promo-message')).toContainText('applied');
  await page.getByRole('button', { name: 'Continue to shipping' }).click();

  await fillShipping(page);
  await page.locator('#ship-express').check();
  await page.getByRole('button', { name: 'Continue to payment' }).click();
  return payAndConfirm(page);
}
