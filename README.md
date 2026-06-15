# 🚀 Playwright TypeScript Framework

A scalable and maintainable **Playwright + TypeScript** automation framework following industry best practices.

---

## 📌 Tech Stack

- Playwright
- TypeScript
- Node.js
- Allure Report
- HTML Report
- Page Object Model (POM)
- Playwright Fixtures

---

## 📂 Project Structure

```text
playwright-typescript-framework
│
├── node_modules/
│
├── reports/
│
├── src/
│   ├── fixtures/
│   ├── pages/
│   └── utils/
│
├── test-results/
│
├── tests/
│   └── sample.spec.ts
│
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to project

```bash
cd playwright-typescript-framework
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

# ▶️ Execute Tests

Run all tests

```bash
npm test
```

or

```bash
npx playwright test
```

Run in headed mode

```bash
npx playwright test --headed
```

Run Chromium

```bash
npx playwright test --project=chromium
```

Run a specific test

```bash
npx playwright test tests/sample.spec.ts
```

---

# 📊 Reports

## HTML Report

Reports are generated automatically.

Open the report

```bash
npx playwright show-report
```

---

## Allure Report

Install Allure CLI (One Time)

### macOS

```bash
brew install allure
```

### Windows

```bash
npm install -g allure-commandline
```

Generate report

```bash
allure generate allure-results --clean
```

Open report

```bash
allure open allure-report
```

Or

```bash
allure serve allure-results
```

---

# 📸 Screenshots

Screenshots are automatically captured during test execution.

Location

```text
test-results/
```

---

# 🎥 Trace

Trace files are generated for debugging.

Open trace

```bash
npx playwright show-trace trace.zip
```

---

# 📁 Framework Modules

## 📂 tests

Contains all automation test cases.

Example

```text
sample.spec.ts
```

---

## 📂 src/pages

Contains all Page Object Model classes.

Example

```text
LoginPage.ts
HomePage.ts
SearchPage.ts
```

---

## 📂 src/fixtures

Contains reusable Playwright fixtures.

Example

```text
baseFixture.ts
```

---

## 📂 src/utils

Contains reusable helper methods.

Examples

```text
DateUtil.ts
Logger.ts
CommonUtil.ts
```

---

# 🌐 Browser Support

- Chromium
- Firefox
- WebKit

---

# 📦 Useful Commands

Install dependencies

```bash
npm install
```

Install browsers

```bash
npx playwright install
```

Run all tests

```bash
npm test
```

Run headed mode

```bash
npx playwright test --headed
```

Run specific browser

```bash
npx playwright test --project=chromium
```

Open HTML Report

```bash
npx playwright show-report
```

Generate Allure Report

```bash
allure generate allure-results --clean
```

Serve Allure Report

```bash
allure serve allure-results
```

---

# 🏗 Framework Architecture

```text
                    Test Cases
                         │
                         ▼
                 Playwright Fixtures
                         │
                         ▼
                 Page Object Classes
                         │
                         ▼
                  Utility Classes
                         │
                         ▼
                    Playwright API
                         │
                         ▼
                 Browser / Context / Page
```

---

# ✅ Best Practices

- Follow Page Object Model (POM)
- Keep locators inside Page classes
- Reuse Fixtures
- Avoid hardcoded waits
- Use Playwright auto waiting
- Write reusable utility methods
- Keep test data separate
- Use explicit assertions
- Generate Allure reports for every execution

---

# 👨‍💻 Author

**HariKrishnan**

Playwright TypeScript Automation Framework