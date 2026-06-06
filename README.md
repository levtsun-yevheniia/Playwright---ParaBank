# ParaBank Playwright Automation Framework

UI test automation framework for the ParaBank demo banking application built with Playwright and TypeScript.

This project demonstrates modern test automation practices including:

- Page Object Model (POM)
- TypeScript
- API Client Layer
- Custom fixtures
- Environment configuration
- Multi-browser configuration
- Reusable test data
- Test Data Factories
- Hybrid UI/API End-to-End Testing
- Playwright best practices
- HTML reporting
- Screenshots on failure

---

### Test Coverage

**Login**

- Positive login with valid credentials
- Negative login with invalid credentials

**Registration**

- Registration and login with the same credentials

**Transactions**

- Hybrid UI/API Flow : UI Login → API Transfer → API Search by amount → UI Verification

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

**Run all tests**

```bash
npm run test
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

**Run tests in QA environment**

**Linux / macOS**

```bash
TEST_ENV=qa npm run test
```

**Windows PowerShell**

```powershell
$env:TEST_ENV="qa" npm run test
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

**Page Object Model (POM)**

Page interactions are separated from test logic.

**API Client Layer**

API requests are encapsulated in dedicated client classes, keeping test scenarios clean and focused on business workflows.

**Reusable Test Data**

Test data is stored in dedicated fixture files.

**Environment Separation**

Different environments can be executed without modifying test code.

**Stable Locators**

Uses Playwright recommended locators.

**Hybrid Testing Approach**

The framework demonstrates how UI and API layers can be combined in a single end-to-end scenario for faster and more reliable validation.

---

### Future Improvements

- CI/CD integration
- Allure reporting
- and more

---

QA Automation Practice Project using Playwright and TypeScript.

```

```
