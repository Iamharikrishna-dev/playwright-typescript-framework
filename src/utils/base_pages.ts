import { Page, Locator, Frame, Download, expect } from '@playwright/test';
import { logger } from './logger';

/**
 * BasePage
 * ---------
 * Every action/assertion below takes the Locator as a parameter instead of
 * having a separate "byRole" / "byTestId" / "byLabel" / "byPlaceholder"
 * variant of each method. Locators belong in the Page Object (built with
 * page.getByRole / getByTestId / etc.) — BasePage just knows how to act on
 * whatever Locator it's handed. That keeps this class small and means new
 * locator strategies never require touching BasePage.
 *
 * Each method wraps its action in try/catch so failures are logged (via the
 * shared Winston logger in ./logger) with context before being rethrown for
 * Playwright to report.
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ================= NAVIGATION =================
  async navigate(url: string) {
    try {
      logger.info(`Navigating to ${url}`);
      await this.page.goto(url);
    } catch (e) {
      logger.error(`Navigate failed for ${url}: ${e}`);
      throw e;
    }
  }

  async reload() {
    try {
      await this.page.reload();
    } catch (e) {
      logger.error(`Reload failed: ${e}`);
      throw e;
    }
  }

  async goBack() {
    try {
      await this.page.goBack();
    } catch (e) {
      logger.error(`Go back failed: ${e}`);
      throw e;
    }
  }

  async goForward() {
    try {
      await this.page.goForward();
    } catch (e) {
      logger.error(`Go forward failed: ${e}`);
      throw e;
    }
  }

  // ================= ACTIONS =================
  async click(locator: Locator, name?: string) {
    try {
      logger.info(`Clicking ${name || locator}`);
      await expect(locator).toBeVisible();
      await locator.click();
    } catch (e) {
      logger.error(`Click failed on ${name || locator}: ${e}`);
      throw e;
    }
  }

  async doubleClick(locator: Locator, name?: string) {
    try {
      logger.info(`Double-clicking ${name || locator}`);
      await locator.dblclick();
    } catch (e) {
      logger.error(`Double click failed on ${name || locator}: ${e}`);
      throw e;
    }
  }

  async rightClick(locator: Locator, name?: string) {
    try {
      logger.info(`Right-clicking ${name || locator}`);
      await locator.click({ button: 'right' });
    } catch (e) {
      logger.error(`Right click failed on ${name || locator}: ${e}`);
      throw e;
    }
  }

  async clickWithModifier(
    locator: Locator,
    modifier: 'Alt' | 'Control' | 'Meta' | 'Shift',
    name?: string
  ) {
    try {
      logger.info(`Clicking ${name || locator} with modifier: ${modifier}`);
      await locator.click({ modifiers: [modifier] });
    } catch (e) {
      logger.error(`clickWithModifier failed on ${name || locator}: ${e}`);
      throw e;
    }
  }

  async hover(locator: Locator, name?: string) {
    try {
      logger.info(`Hovering ${name || locator}`);
      await locator.hover();
    } catch (e) {
      logger.error(`Hover failed on ${name || locator}: ${e}`);
      throw e;
    }
  }

  async focus(locator: Locator, name?: string) {
    try {
      logger.info(`Focusing ${name || locator}`);
      await locator.focus();
    } catch (e) {
      logger.error(`Focus failed on ${name || locator}: ${e}`);
      throw e;
    }
  }

  async blur(locator: Locator, name?: string) {
    try {
      logger.info(`Blurring ${name || locator}`);
      await locator.blur();
    } catch (e) {
      logger.error(`Blur failed on ${name || locator}: ${e}`);
      throw e;
    }
  }

  async fill(locator: Locator, value: string, name?: string) {
    try {
      logger.info(`Filling ${name || locator} with "${value}"`);
      await expect(locator).toBeVisible();
      await locator.fill(value);
    } catch (e) {
      logger.error(`Fill failed on ${name || locator}: ${e}`);
      throw e;
    }
  }

  async clearAndFill(locator: Locator, value: string, name?: string) {
    try {
      logger.info(`Clearing and filling ${name || locator} with "${value}"`);
      await locator.clear();
      await locator.fill(value);
    } catch (e) {
      logger.error(`clearAndFill failed on ${name || locator}: ${e}`);
      throw e;
    }
  }

  async clear(locator: Locator, name?: string) {
    try {
      logger.info(`Clearing ${name || locator}`);
      await locator.clear();
    } catch (e) {
      logger.error(`Clear failed on ${name || locator}: ${e}`);
      throw e;
    }
  }

  async typeSlowly(locator: Locator, value: string, delay = 100, name?: string) {
    try {
      logger.info(`Typing slowly into ${name || locator}: "${value}"`);
      await locator.pressSequentially(value, { delay });
    } catch (e) {
      logger.error(`typeSlowly failed on ${name || locator}: ${e}`);
      throw e;
    }
  }

  async check(locator: Locator, name?: string) {
    try {
      logger.info(`Checking ${name || locator}`);
      await locator.check();
    } catch (e) {
      logger.error(`Check failed on ${name || locator}: ${e}`);
      throw e;
    }
  }

  async uncheck(locator: Locator, name?: string) {
    try {
      logger.info(`Unchecking ${name || locator}`);
      await locator.uncheck();
    } catch (e) {
      logger.error(`Uncheck failed on ${name || locator}: ${e}`);
      throw e;
    }
  }

  async selectOption(
    locator: Locator,
    value: string | string[] | { label?: string; value?: string; index?: number },
    name?: string
  ) {
    try {
      logger.info(`Selecting option on ${name || locator}: ${JSON.stringify(value)}`);
      await locator.selectOption(value as any);
    } catch (e) {
      logger.error(`selectOption failed on ${name || locator}: ${e}`);
      throw e;
    }
  }

  async pressKey(locator: Locator, key: string, name?: string) {
    try {
      logger.info(`Pressing key "${key}" on ${name || locator}`);
      await locator.press(key);
    } catch (e) {
      logger.error(`pressKey failed on ${name || locator}: ${e}`);
      throw e;
    }
  }

  async dragAndDrop(source: Locator, target: Locator) {
    try {
      logger.info(`Dragging source to target`);
      await source.dragTo(target);
    } catch (e) {
      logger.error(`dragAndDrop failed: ${e}`);
      throw e;
    }
  }

  async uploadFile(locator: Locator, filePath: string | string[]) {
    try {
      logger.info(`Uploading file(s) to ${locator}`);
      await locator.setInputFiles(filePath);
    } catch (e) {
      logger.error(`uploadFile failed: ${e}`);
      throw e;
    }
  }

  async downloadFile(locator: Locator): Promise<Download> {
    try {
      logger.info(`Initiating file download`);
      const [download] = await Promise.all([
        this.page.waitForEvent('download'),
        locator.click(),
      ]);
      return download;
    } catch (e) {
      logger.error(`downloadFile failed: ${e}`);
      throw e;
    }
  }

  async scrollIntoView(locator: Locator) {
    try {
      await locator.scrollIntoViewIfNeeded();
    } catch (e) {
      logger.error(`scrollIntoView failed: ${e}`);
      throw e;
    }
  }

  async takeScreenshot(path: string, locator?: Locator, fullPage = false) {
    try {
      if (locator) {
        await locator.screenshot({ path });
      } else {
        await this.page.screenshot({ path, fullPage });
      }
    } catch (e) {
      logger.error(`takeScreenshot failed: ${e}`);
      throw e;
    }
  }

  // ================= WAITS =================
  async waitForVisible(locator: Locator) {
    try {
      await locator.waitFor({ state: 'visible' });
    } catch (e) {
      logger.error(`waitForVisible failed: ${e}`);
      throw e;
    }
  }

  async waitForHidden(locator: Locator) {
    try {
      await locator.waitFor({ state: 'hidden' });
    } catch (e) {
      logger.error(`waitForHidden failed: ${e}`);
      throw e;
    }
  }

  async waitForCount(locator: Locator, count: number, timeout = 30000) {
    try {
      await expect(locator).toHaveCount(count, { timeout });
    } catch (e) {
      logger.error(`waitForCount failed: ${e}`);
      throw e;
    }
  }

  async waitForURL(url: string | RegExp) {
    try {
      await this.page.waitForURL(url);
    } catch (e) {
      logger.error(`waitForURL failed: ${e}`);
      throw e;
    }
  }

  async waitForLoad() {
    try {
      await this.page.waitForLoadState('load');
    } catch (e) {
      logger.error(`waitForLoad failed: ${e}`);
      throw e;
    }
  }

  async waitForNetworkIdle() {
    try {
      await this.page.waitForLoadState('networkidle');
    } catch (e) {
      logger.error(`waitForNetworkIdle failed: ${e}`);
      throw e;
    }
  }

  async waitForTimeout(ms: number) {
    try {
      logger.info(`Waiting for ${ms}ms`);
      await this.page.waitForTimeout(ms);
    } catch (e) {
      logger.error(`waitForTimeout failed: ${e}`);
      throw e;
    }
  }

  async waitForResponse(urlOrPattern: string | RegExp) {
    try {
      logger.info(`Waiting for response: ${urlOrPattern}`);
      return await this.page.waitForResponse(urlOrPattern);
    } catch (e) {
      logger.error(`waitForResponse failed: ${e}`);
      throw e;
    }
  }

  async waitForRequest(urlOrPattern: string | RegExp) {
    try {
      logger.info(`Waiting for request: ${urlOrPattern}`);
      return await this.page.waitForRequest(urlOrPattern);
    } catch (e) {
      logger.error(`waitForRequest failed: ${e}`);
      throw e;
    }
  }

  // ================= GETTERS =================
  async getText(locator: Locator): Promise<string> {
    try {
      await expect(locator).toBeVisible();
      return (await locator.textContent()) || '';
    } catch (e) {
      logger.error(`getText failed: ${e}`);
      throw e;
    }
  }

  async getAllTexts(locator: Locator): Promise<string[]> {
    try {
      return await locator.allTextContents();
    } catch (e) {
      logger.error(`getAllTexts failed: ${e}`);
      throw e;
    }
  }

  async getInputValue(locator: Locator): Promise<string> {
    try {
      return await locator.inputValue();
    } catch (e) {
      logger.error(`getInputValue failed: ${e}`);
      throw e;
    }
  }

  async getAttribute(locator: Locator, attr: string): Promise<string | null> {
    try {
      return await locator.getAttribute(attr);
    } catch (e) {
      logger.error(`getAttribute failed: ${e}`);
      throw e;
    }
  }

  async getCount(locator: Locator): Promise<number> {
    try {
      return await locator.count();
    } catch (e) {
      logger.error(`getCount failed: ${e}`);
      throw e;
    }
  }

  async getTitle(): Promise<string> {
    try {
      return await this.page.title();
    } catch (e) {
      logger.error(`getTitle failed: ${e}`);
      throw e;
    }
  }

  async getCurrentURL(): Promise<string> {
    try {
      return this.page.url();
    } catch (e) {
      logger.error(`getCurrentURL failed: ${e}`);
      throw e;
    }
  }

  // ================= STATE CHECKS =================
  async isVisible(locator: Locator): Promise<boolean> {
    try {
      return await locator.isVisible();
    } catch (e) {
      logger.error(`isVisible failed: ${e}`);
      throw e;
    }
  }

  async isEnabled(locator: Locator): Promise<boolean> {
    try {
      return await locator.isEnabled();
    } catch (e) {
      logger.error(`isEnabled failed: ${e}`);
      throw e;
    }
  }

  async isDisabled(locator: Locator): Promise<boolean> {
    try {
      return await locator.isDisabled();
    } catch (e) {
      logger.error(`isDisabled failed: ${e}`);
      throw e;
    }
  }

  async isChecked(locator: Locator): Promise<boolean> {
    try {
      return await locator.isChecked();
    } catch (e) {
      logger.error(`isChecked failed: ${e}`);
      throw e;
    }
  }

  // ================= ASSERTIONS =================
  async assertVisible(locator: Locator) {
    try {
      await expect(locator).toBeVisible();
    } catch (e) {
      logger.error(`assertVisible failed: ${e}`);
      throw e;
    }
  }

  async assertNotVisible(locator: Locator) {
    try {
      await expect(locator).not.toBeVisible();
    } catch (e) {
      logger.error(`assertNotVisible failed: ${e}`);
      throw e;
    }
  }

  async assertText(locator: Locator, expected: string | RegExp) {
    try {
      await expect(locator).toHaveText(expected);
    } catch (e) {
      logger.error(`assertText failed: ${e}`);
      throw e;
    }
  }

  async assertContainsText(locator: Locator, expected: string | RegExp) {
    try {
      await expect(locator).toContainText(expected);
    } catch (e) {
      logger.error(`assertContainsText failed: ${e}`);
      throw e;
    }
  }

  async assertEnabled(locator: Locator) {
    try {
      await expect(locator).toBeEnabled();
    } catch (e) {
      logger.error(`assertEnabled failed: ${e}`);
      throw e;
    }
  }

  async assertDisabled(locator: Locator) {
    try {
      await expect(locator).toBeDisabled();
    } catch (e) {
      logger.error(`assertDisabled failed: ${e}`);
      throw e;
    }
  }

  async assertChecked(locator: Locator) {
    try {
      await expect(locator).toBeChecked();
    } catch (e) {
      logger.error(`assertChecked failed: ${e}`);
      throw e;
    }
  }

  async assertUnchecked(locator: Locator) {
    try {
      await expect(locator).not.toBeChecked();
    } catch (e) {
      logger.error(`assertUnchecked failed: ${e}`);
      throw e;
    }
  }

  async assertInputValue(locator: Locator, expected: string | RegExp) {
    try {
      await expect(locator).toHaveValue(expected);
    } catch (e) {
      logger.error(`assertInputValue failed: ${e}`);
      throw e;
    }
  }

  async assertAttributeValue(locator: Locator, attr: string, expected: string | RegExp) {
    try {
      await expect(locator).toHaveAttribute(attr, expected);
    } catch (e) {
      logger.error(`assertAttributeValue failed: ${e}`);
      throw e;
    }
  }

  async assertCount(locator: Locator, expected: number) {
    try {
      await expect(locator).toHaveCount(expected);
    } catch (e) {
      logger.error(`assertCount failed: ${e}`);
      throw e;
    }
  }

  async assertURL(expected: string | RegExp) {
    try {
      await expect(this.page).toHaveURL(expected);
    } catch (e) {
      logger.error(`assertURL failed: ${e}`);
      throw e;
    }
  }

  async assertTitle(expected: string | RegExp) {
    try {
      await expect(this.page).toHaveTitle(expected);
    } catch (e) {
      logger.error(`assertTitle failed: ${e}`);
      throw e;
    }
  }

  // ================= FRAME HANDLING =================
  async getFrameByName(name: string): Promise<Frame> {
    try {
      const frame = this.page.frame({ name });
      if (!frame) throw new Error(`Frame with name "${name}" not found`);
      return frame;
    } catch (e) {
      logger.error(`getFrameByName failed: ${e}`);
      throw e;
    }
  }

  async getFrameByURL(url: string | RegExp): Promise<Frame> {
    try {
      const frame = this.page.frame({ url });
      if (!frame) throw new Error(`Frame with URL "${url}" not found`);
      return frame;
    } catch (e) {
      logger.error(`getFrameByURL failed: ${e}`);
      throw e;
    }
  }

  // ================= DIALOG HANDLING =================
  async handleDialog(action: 'accept' | 'dismiss', promptText?: string) {
    try {
      this.page.once('dialog', async (dialog) => {
        logger.info(`${action === 'accept' ? 'Accepting' : 'Dismissing'} dialog: ${dialog.message()}`);
        if (action === 'accept') {
          await dialog.accept(promptText);
        } else {
          await dialog.dismiss();
        }
      });
    } catch (e) {
      logger.error(`handleDialog failed: ${e}`);
      throw e;
    }
  }

  // ================= NEW TAB / WINDOW =================
  async clickAndWaitForNewPage(locator: Locator): Promise<Page> {
    try {
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        locator.click(),
      ]);
      await newPage.waitForLoadState();
      return newPage;
    } catch (e) {
      logger.error(`clickAndWaitForNewPage failed: ${e}`);
      throw e;
    }
  }

  // ================= NETWORK INTERCEPT =================
  async interceptRequest(urlPattern: string | RegExp, handler: (route: any) => Promise<void>) {
    try {
      logger.info(`Intercepting requests matching: ${urlPattern}`);
      await this.page.route(urlPattern, handler);
    } catch (e) {
      logger.error(`interceptRequest failed: ${e}`);
      throw e;
    }
  }

  async mockResponse(urlPattern: string | RegExp, body: object, status = 200) {
    try {
      logger.info(`Mocking response for: ${urlPattern}`);
      await this.page.route(urlPattern, (route) =>
        route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) })
      );
    } catch (e) {
      logger.error(`mockResponse failed: ${e}`);
      throw e;
    }
  }

  async abortRequest(urlPattern: string | RegExp) {
    try {
      logger.info(`Aborting requests matching: ${urlPattern}`);
      await this.page.route(urlPattern, (route) => route.abort());
    } catch (e) {
      logger.error(`abortRequest failed: ${e}`);
      throw e;
    }
  }

  // ================= CLIPBOARD =================
  async copyToClipboard(text: string) {
    try {
      logger.info(`Copying to clipboard: ${text}`);
      await this.page.evaluate((t) => navigator.clipboard.writeText(t), text);
    } catch (e) {
      logger.error(`copyToClipboard failed: ${e}`);
      throw e;
    }
  }

  async getClipboardText(): Promise<string> {
    try {
      return await this.page.evaluate(() => navigator.clipboard.readText());
    } catch (e) {
      logger.error(`getClipboardText failed: ${e}`);
      throw e;
    }
  }

  // ================= JAVASCRIPT EXECUTION =================
  async executeScript<T>(script: string | ((...args: any[]) => T), ...args: any[]): Promise<T> {
    try {
      logger.info(`Executing script`);
      return await this.page.evaluate(script as any, ...args);
    } catch (e) {
      logger.error(`executeScript failed: ${e}`);
      throw e;
    }
  }

  async executeScriptOnLocator<T>(
    locator: Locator,
    script: (element: Element, ...args: any[]) => T,
    ...args: any[]
  ): Promise<T> {
    try {
      logger.info(`Executing script on locator`);
      return await locator.evaluate(script, ...args);
    } catch (e) {
      logger.error(`executeScriptOnLocator failed: ${e}`);
      throw e;
    }
  }

  // ================= SCROLL =================
  async scrollToTop() {
    try {
      await this.page.keyboard.press('Control+Home');
    } catch (e) {
      logger.error(`scrollToTop failed: ${e}`);
      throw e;
    }
  }

  async scrollToBottom() {
    try {
      await this.page.keyboard.press('Control+End');
    } catch (e) {
      logger.error(`scrollToBottom failed: ${e}`);
      throw e;
    }
  }

  async scrollByPixels(x: number, y: number) {
    try {
      logger.info(`Scrolling by x: ${x}, y: ${y}`);
      await this.page.mouse.wheel(x, y);
    } catch (e) {
      logger.error(`scrollByPixels failed: ${e}`);
      throw e;
    }
  }
}
