import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { InventoryPage } from '../pages/inventoryPage';
import { LoginPage } from '../pages/loginPage';

test('SauceDemo - valid login', async ({ page }) => {
  const userName = "standard_user"
  const password = "secret_sauce"
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(userName, password);
  const currentUrl = page.url();
  expect(currentUrl).toBe('https://www.saucedemo.com/inventory.html');
});

test('SauceDemo - invalid login', async ({ page }) => {
  const userName = "invalid"
  const password = "secret_sauce"
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(userName, password);
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service', { exact: true })).toBeVisible();
});

test('SauceDemo - e2e ', async ({ page }) => {
  const userName = "standard_user"
  const password = "secret_sauce"
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(userName, password);

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  inventoryPage.filterBy(2, "lohi");
  inventoryPage.addToCart(inventoryPage.addOnesie);
  await page.waitForLoadState('networkidle', {timeout: 5000});
  inventoryPage.shoppingCart();
  cartPage.checkOut();

  checkoutPage.fillBuyerInfo("Alan", "Pratt", "1234");
  checkoutPage.continue();
  checkoutPage.checkInvoice();
  checkoutPage.finish();

});

