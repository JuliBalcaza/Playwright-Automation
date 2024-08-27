class TasksPage {
    constructor(page) {
        this.page = page;
        this.addTaskButton = 'button:has-text("Add task")';
        this.taskNameInput = '[aria-label="Task name"]';
        this.submitTaskButtonModal = '[data-testid="task-editor-submit-button"]';
    }

    async createTask(taskName) {
        await this.page.click(this.addTaskButton);
        await this.page.waitForSelector(this.taskNameInput, { state: 'visible' });
        await this.page.fill(this.taskNameInput, taskName);
        await this.page.waitForSelector(this.submitTaskButtonModal, { state: 'visible' });
        await this.page.click(this.submitTaskButtonModal, { force: true });
    }

    // Explicitly wait for any animation or DOM update to finish
    async waitForTaskToBeVisible(taskName) {
        await this.page.evaluate(() => new Promise(resolve => {
            requestAnimationFrame(() => {
                setTimeout(resolve, 1000);
            });
        }));

        const taskSelector = `div[data-task-list-id="${new Date().toISOString().split('T')[0]}"] li.task_list_item:has-text("${taskName}")`;
        const elementHandle = await this.page.waitForSelector(taskSelector, { timeout: 10000 });
        return elementHandle.isVisible();
    }

    async markTaskAsComplete(taskName) {
        const today = new Date().toISOString().split('T')[0];
        const taskSelector = `div[data-task-list-id="${today}"] li.task_list_item:has-text("${taskName}")`;

        // Locate the button to mark as completed the task
        const completeButtonSelector = `${taskSelector} button[aria-label="Mark task as complete"]`;
        const completeButton = this.page.locator(completeButtonSelector);

        // Scroll to the button and click on it
        await completeButton.scrollIntoViewIfNeeded();
        await completeButton.click();
    }
}

module.exports = TasksPage;
