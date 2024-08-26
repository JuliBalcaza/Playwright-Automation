const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/loginPage');
const { authLoginPage } = require('../support/helpers');

test('Unsuccessful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.WRONGUSER;
    const password = process.env.WRONGPASSWORD;

    await page.goto(authLoginPage);
    await loginPage.login(username, password);

    const errorVisible = await loginPage.isErrorMessageVisible();
    expect(errorVisible).toBeTruthy();
});
