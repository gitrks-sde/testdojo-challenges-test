import type { Page } from '@playwright/test';

/**
 * Challenge 01 · Registration Rookie (Easy)
 * Page: Elements › Forms → await page.goto('/elements/forms.html')
 *
 * 1. Fill the registration form:
 *      Full name      Asha Verma
 *      Email          asha.verma@example.com
 *      Phone          9876543210
 *      Date of birth  21 April 1998
 *      Password       any, at least 6 characters, confirmed
 * 2. Submit the form and wait for the success message.
 * 3. In the Autosuggest field, type "Ind" and choose "India" from the suggestions.
 *
 * Full details and a hint: https://testdojo.testverse.workers.dev/challenges
 */
export async function registrationRookie(page: Page): Promise<void> {
  // Your automation goes here.
  throw new Error('Challenge 01 is not solved yet');
}
