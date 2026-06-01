# ParaBank Playwright Automation Framework

UI test automation framework for the ParaBank demo banking application built with Playwright and TypeScript.

This project demonstrates modern test automation practices including:

- Page Object Model (POM)
- TypeScript
- Environment configuration
- Reusable test data
- Playwright best practices
- HTML reporting
- Screenshots on failure

---

### Test Coverage

** Login Page **

- Positive login with valid credentials
- Negative login with invalid credentials _(known application issue)_

---

### Tech Stack

- Playwright
- TypeScript
- Node.js
- dotenv

---

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project folder:

```bash
cd parabank-playwright
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

### Environment Configuration

Environment variables are stored in the `environments` folder.

### .env.qa

```env
BASE_URL=https://parabank.parasoft.com/parabank
USERNAME=john
PASSWORD=demo
```

### .env.dev

```env
BASE_URL=https://parabank.parasoft.com/parabank
USERNAME=john
PASSWORD=demo
```

---

### Running Tests

** Run all tests **

```bash
npx playwright test
```

** Run tests in QA environment **

** Linux / macOS **

```bash
TEST_ENV=qa npx playwright test
```

** Windows PowerShell **

```powershell
$env:TEST_ENV="qa"
npx playwright test
```

---

### Test Reports

Open the HTML report:

```bash
npx playwright show-report
```

The report includes:

- Test execution results
- Screenshots
- Error details

---

### Design Principles

** Page Object Model (POM) **

Page interactions are separated from test logic.

** Reusable Test Data **

Test data is stored in dedicated fixture files.

** Environment Separation **

Different environments can be executed without modifying test code.

** Stable Locators **

Uses Playwright recommended locators:

```
---

### Future Improvements

- API testing
- Custom fixtures
- CI/CD integration
- Allure reporting
- and more

---


QA Automation Practice Project using Playwright and TypeScript.
```
