import { Page, Locator } from '@playwright/test';
import { BasePage } from '../utils/base_pages';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.navigate(process.env.BASE_URL || 'https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username, 'username field');
    await this.fill(this.passwordInput, password, 'password field');
    await this.click(this.loginButton, 'login button');
  }

  async getErrorText(): Promise<string> {
    return this.getText(this.errorMessage);
  }
}
