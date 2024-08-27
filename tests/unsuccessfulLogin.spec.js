const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/LoginPage');
const { authLoginPage } = require('../support/helpers');

test('Attempt login with incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.WRONGUSER;
    const password = process.env.WRONGPASSWORD;

    // Action: Attempt to log in with incorrect credentials
    await page.goto(authLoginPage);
    await loginPage.login(username, password);

    // Verify that the error message is displayed after failed login
    const errorVisible = await loginPage.isErrorMessageVisible();
    expect(errorVisible).toBeTruthy();
});


test('Login should fail when password is too short or empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.USERNAME;
    const invalidPassword = '';

    // Attempt to log in with a valid username and an empty password
    await page.goto(authLoginPage);
    await loginPage.login(username, invalidPassword);

    // Wait for the the error message
    const errorMessageElement = await page.waitForSelector(loginPage.emptyPasswrodMessage, { timeout: 5000 });

    // Verify that the error message indicating the password requirement is displayed
    const errorMessageText = await errorMessageElement.textContent();
    expect(errorMessageText).toBe('Passwords must be at least 8 characters long.');
});


test('Login should fail with invalid email format', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const invalidFormat = process.env.INVALIDUSERFORMAT;
    const password = process.env.PASSWORD;

    // Action: Attempt to log in with incorrect format
    await page.goto(authLoginPage);
    await loginPage.login(invalidFormat, password);

    // Verify that the error message indicating the email format is invalid is displayed
    const emailInput = await page.$(loginPage.usernameInput);
    const validationMessage = await emailInput.evaluate(input => input.validationMessage);

    expect(validationMessage).toBe('Enter an email address');
});