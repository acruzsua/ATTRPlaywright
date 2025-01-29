import { expect, Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage{
    readonly checkoutButton: Locator;
    readonly cartTitle : Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.getByTestId('checkout');
        this.cartTitle = page.getByTestId('title');
    }

    async checkOut() {
        await this.checkoutButton.click();
    }

    async isCartPage() {
        await expect(this.cartTitle).toHaveText('Your Cart');
    }

}
