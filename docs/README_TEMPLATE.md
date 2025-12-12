# MovieMatch — QA & Automation Suite


## Overview
This repository contains test cases, API collections, and automation scripts to validate the MovieMatch AI recommender app: https://movie-finder-d128b.web.app


**App credentials:**
- Username: test@mail.com
- Password: MMd4vEwEvDTi8ZZ


## Contents
- /docs/test-cases.csv — Comprehensive test cases for manual and automated runs
- /ui-tests/playwright — Playwright-based UI automation
- /selenium — Selenium (Python) smoke tests


## Running Playwright UI Tests
1. Install Node & npm
2. From `/ui-tests/playwright` run:
```bash
npm install
npx playwright install
npm test
