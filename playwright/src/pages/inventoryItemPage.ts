import { type Page } from '@playwright/test';
import { InventoryPage } from './inventoryPage';


export class InventoryItemPage extends InventoryPage {

     constructor(page: Page) {
        super(page);

    }

    async backToProducts() {
        await this.page.getByTestId('back-to-products').click();
    }

}