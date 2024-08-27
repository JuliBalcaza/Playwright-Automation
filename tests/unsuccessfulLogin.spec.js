const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/LoginPage');
const { authLoginPage } = require('../support/helpers');

test('Unsuccessful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.WRONGUSER;
    const password = process.env.WRONGPASSWORD;

    // Go to the login page
    await page.goto(authLoginPage);
    // Attempt to log in with incorrect credentials
    await loginPage.login(username, password);

    const errorVisible = await loginPage.isErrorMessageVisible();
    // Ensure the error message is displayed
    expect(errorVisible).toBeTruthy();
});