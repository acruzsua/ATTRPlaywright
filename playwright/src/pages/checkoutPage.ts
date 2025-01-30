import { expect, Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage{
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly totalLabel: Locator;
    readonly finishButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.postalCodeInput = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.totalLabel = page.getByTestId("total-label");
        this.finishButton = page.getByTestId('finish');
        this.successMessage = page.getByText('Thank you for your order!', { exact: true });
    }

    async fillBuyerInfo(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continue() {
        await this.continueButton.click();
    }

    async checkInvoice() {
        await expect(this.totalLabel).toBeVisible();
        const totalText = await this.totalLabel.textContent();
        expect(totalText).toMatch(/Total: \$/);
    }

    async finish() {
        await this.finishButton.click();
    }

    async isCheckoutPage() {
        await expect(this.firstNameInput).toBeVisible();
    }

    async isOrderSuccessful() {
        await expect(this.successMessage).toBeVisible();
    }
}
