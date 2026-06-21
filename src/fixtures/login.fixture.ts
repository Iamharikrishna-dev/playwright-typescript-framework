import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type LoginFixtures = {
  loginPage: LoginPage;
};

/**
 * Fixture for the Login module.
 * Any spec that only needs LoginPage can import `test` straight from here
 * instead of pulling in every page object the project has.
 */
export const test = base.extend<LoginFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
