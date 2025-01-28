import { expect, type Page } from '@playwright/test';


export class InventoryPage {

    readonly page: Page;
    readonly addOnesie:string;
    readonly addBike:string;
    readonly addBoltTShirt:string;
    readonly addRedTShirt:string;
    readonly addBackpack:string;
    readonly addFleeceJacket:string;
    readonly removeOnesie:string;

    constructor(page: Page) {
        this.page = page;
        this.addOnesie = "add-to-cart-sauce-labs-onesie";
        this.addBike = "add-to-cart-sauce-labs-bike-light";
        this.addBoltTShirt  = "add-to-cart-sauce-labs-bolt-t-shirt";
        this.addRedTShirt = "add-to-cart-test.allthethings()-t-shirt-(red)";
        this.addBackpack = "add-to-cart-sauce-labs-backpack";
        this.addFleeceJacket = "add-to-cart-sauce-labs-fleece-jacket";
        this.removeOnesie = "remove-sauce-labs-onesie";  
    }

    async filterBy(
        option: number,
        value: string
    ) {
        const select = this.page.getByTestId('product-sort-container');
        await select.selectOption({ index: option });
        const selectedValue = await select.inputValue();
        expect(selectedValue).toBe(value); 
    }

    async addToCart(
        dataTestId: string
    ) {
        await this.page.getByTestId(dataTestId).click();
    }
    async remove(
        dataTestId: string
    ) {
        await this.page.getByTestId(dataTestId).click();
    }
    async shoppingCart() {
        //await this.page.getByTestId("shopping-cart-link").click();
        await this.page.locator('#shopping_cart_container').click();
    }   
        
}