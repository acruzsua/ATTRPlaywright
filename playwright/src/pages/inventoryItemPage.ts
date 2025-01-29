import { Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class InventoryItemPage extends BasePage {
    readonly backToProductsButton: Locator;

    constructor(page: Page) {
        super(page);
        this.backToProductsButton = page.getByTestId('back-to-products');

    }

    async backToProducts() {
        await this.backToProductsButton.click();
    }

}
