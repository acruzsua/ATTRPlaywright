import { test } from '@playwright/test';
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
  await loginPage.isLoginSuccessful();
});

test('SauceDemo - invalid login', async ({ page }) => {
  const userName = "invalid"
  const password = "secret_sauce"
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(userName, password);
  await loginPage.isLoginFailed();
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

  await inventoryPage.filterBy(2, "lohi");
  await inventoryPage.addToCart('onesie');
  await inventoryPage.goToShoppingCart();
  await cartPage.waitForElement("checkout")
  await cartPage.isCartPage();
  await cartPage.checkOut();

  await checkoutPage.waitForElement("firstName")
  await checkoutPage.fillBuyerInfo("Alan", "Pratt", "1234");
  await checkoutPage.continue();
  await checkoutPage.checkInvoice();
  await checkoutPage.finish();
  await checkoutPage.isOrderSuccessful();

});
