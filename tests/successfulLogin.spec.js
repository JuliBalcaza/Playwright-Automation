const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/LoginPage');
const { authLoginPage, dashboardPage } = require('../support/helpers');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;

    // Action: Log in before each test
    await page.goto(authLoginPage);
    await loginPage.login(username, password);
});

test('Login should be successful & redirect to dashboard', async ({ page }) => {
	const loginPage = new LoginPage(page);

	// Verify successful login
    await loginPage.waitForLoginSuccess();
});

test('Verify redirection to dashboard after login', async ({ page }) => {

    // Verify that the user is on the dashboard page
    await expect(page).toHaveURL(dashboardPage);
});