import { type Page } from '@playwright/test';


export class CartPage  {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async accessItem(item: number) {
        await this.page.getByTestId(`item-${item}-title-link`).click();
    }

     async checkOut() {
        await this.page.getByTestId('checkout').click();
    }
    
}