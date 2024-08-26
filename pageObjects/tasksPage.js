class TasksPage {
	constructor(page) {
		this.page = page;
		this.taskNameInput = 'input[placeholder="Task name"]';
		this.addTaskButton = '[data-testid="task-editor-submit-button"]';
	}

	async createTask(taskName) {
		await this.page.fill(this.taskNameInput, taskName);
		await this.page.click(this.addTaskButton);
	}

	async isTaskVisible(taskName) {
		return await this.page.isVisible(`text=${taskName}`);
	}
}

module.exports = TasksPage;
