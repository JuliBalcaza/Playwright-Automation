const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/LoginPage');
const { authLoginPage, dashboardPage } = require('../support/helpers');


test('Successful login', async ({ page }) => {
	const loginPage = new LoginPage(page);
	const username = process.env.USERNAME;
	const password = process.env.PASSWORD;

	// Go to the login page
	await page.goto(authLoginPage);
	await loginPage.login(username, password);
	// Wait for login success confirmation
	await loginPage.waitForLoginSuccess();
	// Verify that the URL is the dashboard page
	await expect(page).toHaveURL(dashboardPage)
});