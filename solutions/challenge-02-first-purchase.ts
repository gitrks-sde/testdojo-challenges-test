// REFERENCE SOLUTION. Never publish: used only to prove the checks pass.
import { expect, type Page } from '@playwright/test';
import { fillShipping, payAndConfirm } from './checkout-helpers';

export async function firstPurchase(page: Page): Promise<string> {
  await page.goto('/flows/shop.html');
  await page.getByTestId('add-to-cart-M100').click();
  await expect(page.getByTestId('cart-count')).toHaveText('1');
  await page.getByRole('button', { name: 'Proceed to checkout' }).click();

  await page.getByRole('button', { name: 'Continue to shipping' }).click();
  await fillShipping(page);
  await page.getByRole('button', { name: 'Continue to payment' }).click();
  return payAndConfirm(page);
}
