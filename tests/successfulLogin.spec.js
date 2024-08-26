const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/loginPage');
const { authLoginPage, dashboardPage } = require('../support/helpers');


test('Successful login', async ({ page }) => {
	const loginPage = new LoginPage(page);
	const username = process.env.USERNAME;
	const password = process.env.PASSWORD;

	await page.goto(authLoginPage);
	await loginPage.login(username, password);
	await loginPage.waitForLoginSuccess();

	await expect(page).toHaveURL(dashboardPage)
});