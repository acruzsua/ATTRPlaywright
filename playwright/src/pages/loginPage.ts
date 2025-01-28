import { type Page } from '@playwright/test';


export class LoginPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(
        userName: string,
        password:string
    ) {
        await this.page.getByTestId('username').fill(userName);
        await this.page.getByTestId('password').fill(password);
        await this.page.getByTestId('login-button').click();

    }
}