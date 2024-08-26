class LoginPage {
	constructor(page) {
		this.page = page;
		this.usernameInput = '#element-0';
		this.passwordInput = '#element-3';
		this.loginButton = '[data-gtm-id="start-email-login"]';
		this.sidebarContainer = 'button[aria-label="Settings"]';
		this.errorMessage = 'div:has-text("Wrong email or password.")';
	}

	async login(username, password) {
		await this.page.fill(this.usernameInput, username);
		await this.page.fill(this.passwordInput, password);
		await this.page.waitForSelector(this.loginButton, { state: 'visible' });
		await this.page.click(this.loginButton);
	}

	async waitForLoginSuccess() {
		await this.page.waitForSelector(this.sidebarContainer, { state: 'visible', timeout: 60000 });
	}

	async isErrorMessageVisible() {
    await this.page.waitForSelector(this.errorMessage, { state: 'visible'});
    return await this.page.isVisible(this.errorMessage);
	}
}

module.exports = LoginPage;
