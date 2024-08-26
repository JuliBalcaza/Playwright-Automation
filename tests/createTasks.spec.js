const { test, expect } = require('@playwright/test');
const { authLoginPage, dashboardPage } = require('../support/helpers');
const LoginPage = require('../pageObjects/loginPage');
const TasksPage = require('../pageObjects/tasksPage')

let loginPage;
let tasksPage;

test.beforeEach(async ({ page }) => {
	loginPage = new LoginPage(page);
	tasksPage = new TasksPage(page);
	const username = process.env.USERNAME;
	const password = process.env.PASSWORD;

	await page.goto(authLoginPage);
	await loginPage.login(username, password);
});

test.skip('Create new task and validate', async ({ page }) => {
	const tasksPage = new TasksPage(page);
	const taskName = `Task ${Date.now()}`;

	await page.goto(dashboardPage);
	await tasksPage.createTask(taskName);

	const taskExists = await tasksPage.isTaskVisible(taskName);
	expect(taskExists).toBeTruthy();
});

test.skip('Create 10 new tasks with dynamic names', async ({ page }) => {
	await page.goto(dashboardPage);

	for (let i = 1; i <= 10; i++) {
		const taskName = `Task ${Date.now()} - ${i}`;
		await tasksPage.createTask(taskName);

		const taskExists = await tasksPage.validateTaskExists(taskName);
		expect(taskExists).toBeTruthy();
	}
});
