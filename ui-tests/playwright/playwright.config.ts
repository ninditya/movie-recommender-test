import { defineConfig } from '@playwright/test';
export default defineConfig({
    timeout: 30000,
    testDir: './tests',
    use: {
        headless: true,
        viewport: { width: 1280, height: 800 },
        actionTimeout: 10000,
    }
});