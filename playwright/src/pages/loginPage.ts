import { Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(userName: string, password: string) {
        await this.usernameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async isLoginSuccessful() {
        await expect(this.page).toHaveURL(/inventory/);
    }

    async isLoginFailed() {
        await expect(this.page.getByText('Epic sadface: Username and password do not match any user in this service', { exact: true })).toBeVisible();
    }
}
