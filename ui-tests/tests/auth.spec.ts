import { test, expect } from '@playwright/test';
const BASE = 'https://movie-finder-d128b.web.app';
const EMAIL = 'test@mail.com';
const PASS = 'MMd4vEwEvDTi8ZZ';


test('Login and view dashboard', async ({ page }) => {
    await page.goto(BASE);
    await page.locator('input[type="email"]').fill(EMAIL);
    await page.locator('input[type="password"]').fill(PASS);
    await page.getByRole('button', { name: /Sign In/i }).click();
    await expect(page.getByText(/welcome back/i)).toBeVisible();
});