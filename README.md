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
- Per-module Playwright Fixtures
- dotenv (multi-environment config)

---

## 📂 Project Structure

```text
playwright-typescript-framework
│
├── env/
│   ├── .env.dev              # config for ENV=dev 
│   └── .env.qa                # config for ENV=qa
│
├── node_modules/
│
├── reports/
│
├── src/
│   ├── fixtures/
│   │   ├── login.fixture.ts       # fixture for the Login module only
│   │   └── index.ts               # merges module fixtures for specs that need more than one
│   ├── pages/
│   │   └── LoginPage.ts
│   └── utils/
│       └── base_pages.ts          # one action method per behaviour, driven by Locator
│
├── test-results/
│
├── tests/
│   └── login.spec.ts
│
├── .gitignore
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

# 🌐 Environment Configuration

Config lives in **one file per environment** under `env/`, not a single `.env` at the root:

```text
env/.env.dev
env/.env.qa
```

Each file holds whatever that environment needs, e.g.:

```env
ENV=dev
BASE_URL=https://www.saucedemo.com/
APP_USERNAME=standard_user
APP_PASSWORD=secret_sauce
```

`playwright.config.ts` reads the `ENV` variable (defaults to `dev`) and loads the matching file with `dotenv` before the config is built:

```ts
const environment = process.env.ENV || 'dev';
dotenv.config({ path: path.resolve(__dirname, `env/.env.${environment}`) });
```

To add a new environment (e.g. `staging`), just drop in `env/.env.staging` and run with `ENV=staging`.

---

# ▶️ Execute Tests

All scripts live in `package.json` (uses `cross-env` so they work on macOS/Linux/Windows alike):

```bash
npm test            # ENV=dev, all tests
npm run test:dev    # explicit dev run
npm run test:qa     # ENV=qa run
npm run test:headed # headed browser, dev env
npm run test:debug  # Playwright inspector, dev env
npm run test:ui     # Playwright UI mode, dev env
npm run test:chromium # chromium project only, dev env
```

Run a specific spec or test, same as any Playwright project:

```bash
npx playwright test tests/login.spec.ts
npx playwright test -g "shows an error for invalid credentials"
```

Just list discovered tests without running them:

```bash
npx playwright test --list
```

---

# 📊 Reports

## HTML Report

```bash
npm run report
```

## Allure Report

Install Allure CLI (one time)

**macOS**
```bash
brew install allure
```

**Windows**
```bash
npm install -g allure-commandline
```

Generate and open:

```bash
npm run allure:generate
npm run allure:open
```

Or serve directly:

```bash
npm run allure:serve
```

---

# 📸 Screenshots & 🎥 Trace

Screenshots (`only-on-failure`) and videos (`retain-on-failure`) land in `test-results/`. Traces are captured `on-first-retry`:

```bash
npx playwright show-trace trace.zip
```

---

# 📁 Framework Modules

## `tests/`

One spec file per feature/module. Tests stay **flat** — no `test.step()` wrapping and no separate "steps" layer. Each `test()` body just calls page-object methods directly in order, so the spec itself reads as the steps:

```ts
test('shows an error for invalid credentials', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'wrong-password');
  await loginPage.assertVisible(loginPage.errorMessage);
});
```

## `src/pages/`

Page Object Model classes. Locators are built **inside** the page object (`page.locator(...)`, `page.getByRole(...)`, etc.) and exposed as readonly fields — `BasePage` never needs to know how a locator was built, only what to do with it.

## `src/fixtures/`

One fixture file per module instead of a single bloated base fixture:

```ts
// login.fixture.ts — only knows about LoginPage
export const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
});
```

A spec that only touches login imports `login.fixture` directly. A spec that needs both login **and** inventory imports the merged fixture from `src/fixtures/index.ts` (built with Playwright's `mergeTests`), so you only ever pull in the page objects a given spec actually uses.

## `src/utils/base_pages.ts`

Reusable action/assertion methods, **one method per behaviour** — `click`, `fill`, `check`, `assertVisible`, etc. — each taking a `Locator` parameter, instead of separate `clickByRole` / `clickByTestId` / `clickByLabel` / `clickByPlaceholder` variants of every action. Locator strategy is the page object's concern; `BasePage` just acts on whatever `Locator` it's handed.

```ts
// in BasePage
async click(locator: Locator, name?: string) { ... }

// in a page object
await this.click(this.loginButton, 'login button');
```

---

# 🎬 Demo

`tests/login.spec.ts` and `tests/inventory.spec.ts` exercise the framework end-to-end against the public [Sauce Demo](https://www.saucedemo.com/) site:

- **`login.spec.ts`** — uses the `login.fixture` directly to assert an error shows for bad credentials.
- **`inventory.spec.ts`** — uses the merged fixture (`loginPage` + `inventoryPage`) to log in, land on the products page, and add an item to the cart.

Run them with:

```bash
npm test
```

---

# 🌐 Browser Support

- Chromium (enabled by default in `playwright.config.ts`)
- Firefox / WebKit / mobile / branded browsers are available — uncomment the relevant `projects` entry to turn them on.

---

# ✅ Best Practices Followed Here

- Page Object Model (POM) with locators defined in the page object
- One action/assertion method per behaviour in `BasePage`, parameterized by `Locator`
- One fixture per module, merged only where a spec needs more than one
- No hardcoded waits — Playwright auto-waiting + explicit `waitFor`/`expect`
- Flat tests, no `test.step()` / steps-function layer
- Environment config isolated per `env/.env.<name>` file, selected via `ENV`
- Explicit assertions via `BasePage`'s `assert*` methods

---

# 👨‍💻 Author

**HariKrishnan**

Playwright TypeScript Automation Framework
