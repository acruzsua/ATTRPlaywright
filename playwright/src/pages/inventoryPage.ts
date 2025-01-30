import { expect, Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class InventoryPage extends BasePage {
    readonly productSortDropdown: Locator;
    readonly shoppingCartIcon: Locator;

    readonly products: {
        onesie: Locator;
        bikeLight: Locator;
        boltTShirt: Locator;
        redTShirt: Locator;
        backpack: Locator;
        fleeceJacket: Locator;
    };
    constructor(page: Page) {
        super(page);
        this.productSortDropdown = page.getByTestId('product-sort-container');
        this.shoppingCartIcon = page.getByTestId('shopping-cart-link');
    
        this.products = {
            onesie: page.getByTestId('add-to-cart-sauce-labs-onesie'),
            bikeLight: page.getByTestId('add-to-cart-sauce-labs-bike-light'),
            boltTShirt: page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt'),
            redTShirt: page.getByTestId('add-to-cart-test.allthethings()-t-shirt-(red)'),
            backpack: page.getByTestId('add-to-cart-sauce-labs-backpack'),
            fleeceJacket: page.getByTestId('add-to-cart-sauce-labs-fleece-jacket'),
        };
    
    }

    async filterBy(option: number, expectedValue: string) {
        await this.productSortDropdown.selectOption({ index: option });
        const selectedValue = await this.productSortDropdown.inputValue();
        expect(selectedValue).toBe(expectedValue);
    }

    async addToCart(product: keyof typeof this.products) {
        await this.products[product].click();
    }

    async goToShoppingCart() {
        await this.shoppingCartIcon.waitFor({ state: 'visible' }); // Ensure it's visible
        await this.shoppingCartIcon.waitFor({ state: 'attached' }); // Ensure it's in the DOM
        await this.shoppingCartIcon.click();
    }
}
