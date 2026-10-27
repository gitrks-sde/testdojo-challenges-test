// REFERENCE SOLUTION helper. Never publish.
import { expect, type Page } from '@playwright/test';

export async function fillShipping(page: Page): Promise<void> {
  await page.getByLabel('Full name').fill('Asha Verma');
  await page.getByLabel('Email').fill('asha.verma@example.com');
  await page.getByLabel('Street address').fill('221 MG Road');
  await page.getByLabel('City').fill('Bengaluru');
  await page.getByLabel('Country').selectOption('IN');
  await page.locator('#ship-postal').fill('560001');
  await page.getByLabel('Phone').fill('9876543210');
}

export async function payAndConfirm(page: Page): Promise<string> {
  await page.getByLabel('Name on card').fill('Asha Verma');
  await page.getByLabel('Card number').fill('4242 4242 4242 4242');
  await page.getByLabel('Expiry (MM/YY)').fill('12/30');
  await page.getByLabel('CVV').fill('123');
  await page.locator('#place-order').click();
  await page.waitForURL(/order-confirmation/, { timeout: 15_000 });
  const orderNumber = (await page.getByTestId('order-id').innerText()).trim();
  expect(orderNumber).toMatch(/^TD-/);
  return orderNumber;
}
