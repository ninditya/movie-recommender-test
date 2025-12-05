import { test, expect } from '@playwright/test';

const BASE = 'https://movie-finder-d128b.web.app';
const EMAIL = 'test@mail.com';
const PASS = 'MMd4vEwEvDTi8ZZ';

test('AI variability tolerance check', async ({ page }) => {
  await page.goto(BASE);

  await page.locator('input[type="email"]').fill(EMAIL);
  await page.locator('input[type="password"]').fill(PASS);
  await page.getByRole('button', { name: /Sign In/i }).click();

  await page.waitForSelector('input[placeholder="Search"]');

  const searchBox = page.locator('input[placeholder="Search"]');
  await searchBox.fill('Interstellar');

  const searchBtn = page.getByRole('button', { name: /Search/i });
  await searchBtn.click();

  const result = page.locator('div[data-slot="card"]');
  await expect(result.first()).toBeVisible({ timeout: 10000 });
});

