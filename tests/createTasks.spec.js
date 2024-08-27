const { test, expect } = require('@playwright/test');
const { authLoginPage, dashboardPage } = require('../support/helpers');
const LoginPage = require('../pageObjects/LoginPage');
const TasksPage = require('../pageObjects/tasksPage');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;

    // Action: Log in before each test
    await page.goto(authLoginPage);
    await loginPage.login(username, password);
    await loginPage.waitForLoginSuccess();
});

test('Verify redirection to dashboard after login', async ({ page }) => {

    // Verify that the user is on the dashboard page
    await expect(page).toHaveURL(dashboardPage);
});


test('Create new task & verify task creation', async ({ page }) => {
    const taskPage = new TasksPage(page);
    const taskName = `Task ${Date.now()}`;
    await taskPage.createTask(taskName);

    // Verify that the task has been created and is visible.
    const isVisible = await taskPage.waitForTaskToBeVisible(taskName);
    expect(isVisible).toBeTruthy();
});


test('Create 10 new tasks with dynamic names', async ({ page }) => {
    const taskPage = new TasksPage(page);
    await page.goto(dashboardPage);
    const taskNames = [];

    // Store new names in taskNames
    for (let i = 1; i <= 10; i++) {
        const taskName = `Task ${Date.now()} - ${i}`;
        await taskPage.createTask(taskName);

        const isVisible = await taskPage.waitForTaskToBeVisible(taskName);
        expect(isVisible).toBeTruthy();

		 // Add the task name to the array
        taskNames.push(taskName);
    }

    // Mark all tasks as completed
    for (const taskName of taskNames) {
        await taskPage.markTaskAsComplete(taskName);
    }

    // Explicit wait before test end to ensure that tasks are completed
    await page.waitForTimeout(3000);
});


