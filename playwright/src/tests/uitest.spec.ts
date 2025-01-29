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

  inventoryPage.filterBy(2, "lohi");
  await page.waitForLoadState('domcontentloaded'); // Ensures DOM is ready
  await page.waitForLoadState('networkidle'); // Ensures all requests are finished
  inventoryPage.addToCart('onesie');
  inventoryPage.goToShoppingCart();
  cartPage.waitForElement("checkout")
  cartPage.isCartPage();
  cartPage.checkOut();

  checkoutPage.waitForElement("firstName") // Test Failed: lack of components rendered on page
  checkoutPage.fillBuyerInfo("Alan", "Pratt", "1234");
  checkoutPage.continue();
  checkoutPage.checkInvoice();
  checkoutPage.finish();
  checkoutPage.isOrderSuccessful();

});

