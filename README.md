# Playwright Testing Practice - Todoist Web App

## Overview - Playwright Testing

This project is an initial step towards automation testing for the Todoist web application. Currently, it focuses on automating frontend tests, including successful and unsuccessful login scenarios, and task creation using Playwright. Future phases will include API testing and integration with CI/CD pipelines to ensure comprehensive test coverage and continuous delivery.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JuliBalcaza/Playwright-Automation
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```
   USERNAME=<your-username>
   PASSWORD=<your-password>
   ```

## Running Tests

To execute all tests:
```bash
npx playwright test
```

To run tests in headed mode (with browser UI):
```bash
npx playwright test --headed
```

To run tests in debug mode:
```bash
npx playwright test --debug
```
## Enhancements
- API testing capabilities.

- Integrate with CI/CD pipelines to enable automated test execution for every code push.

## CI/CD

This project includes a GitHub Actions workflow to run tests automatically on push or pull request.