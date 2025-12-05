import { test, expect } from '@playwright/test';

const BASE = 'https://movie-finder-d128b.web.app';
const EMAIL = 'test@mail.com';
const PASS = 'MMd4vEwEvDTi8ZZ';

test('Search shows movie card and recommendations', async ({ page }) => {
    await page.goto(BASE);

    await page.locator('input[type="email"]').fill(EMAIL);
    await page.locator('input[type="password"]').fill(PASS);

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        page.getByRole('button', { name: /Sign In/i }).click()
    ]);

    // Ambil textbox ke-3 (karena 1 email, 2 password, 3 search)
    const searchBox = page.getByRole('textbox').nth(2);

    await searchBox.waitFor({ timeout: 15000 });
    await searchBox.fill('The Big Lebowski');

    await page.getByRole('button', { name: /Search/i }).click();

    await expect(page.getByText('The Big Lebowski')).toBeVisible({ timeout: 15000 });
});

