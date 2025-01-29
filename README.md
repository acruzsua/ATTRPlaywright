# Playwright UI Testing Guide

## 1. Running UI Tests in Playwright

### Steps:

1. Clone the repo, navigate to playwright folder and install necessary dependencies:
   ```sh
   npm i
   ```

2. Run tests in the test runner:
   ```sh
   npm run pw:open
   ```

3. Run tests in headless mode:
   ```sh
   npm run pw:run
   ```

## 2. Why Option 2: Sauce demo
Sauce demo DOM contains the data-test attribute, a best practice for making automated tests more stable and maintainable.