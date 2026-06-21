import { test, expect } from '../src/fixtures/login.fixture';

test.describe('Login', () => {
  test('shows an error for invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong-password');

    await loginPage.assertVisible(loginPage.errorMessage);
    await loginPage.assertContainsText(loginPage.errorMessage, 'Username and password do not match');
  });
});
