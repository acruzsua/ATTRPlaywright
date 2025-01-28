import { expect, type Page } from '@playwright/test';


export class CheckoutPage {

    readonly page: Page;
    readonly firstName: string;
    readonly lastName: string;
    readonly postalCode: string;
    readonly continueButton: string;
    readonly total: string;
    readonly finishButton: string;

    constructor(page: Page) {
        this.page = page;
        this.firstName = "firstName";
        this.lastName = "lastName";
        this.postalCode  = "postalCode";
        this.continueButton = "continue";
        this.total = "total-label"
        this.finishButton = "finish"
    }
    async fillBuyerInfo(
        firstName: string,
        lastName: string,
        postalCode: string,
    ) {
        await this.page.getByTestId(this.firstName).fill(firstName);
        await this.page.getByTestId(this.lastName).fill(lastName);
        await this.page.getByTestId(this.postalCode).fill(postalCode);
    }
    async continue() {
        await this.page.getByTestId(this.continueButton).click();
    }

    async checkInvoice() {
        await this.page.waitForSelector("div[class='summary_total_label']");
        const total = await this.page.getByTestId(this.total);
        await expect(total).toHaveText('Total: $8.63');

    }

    async finish() {
        await this.page.getByTestId(this.finishButton).click();
        await expect(this.page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
    }
     
}