import { Page, Locator, expect, Frame, Download } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ================= NAVIGATION =================
  async navigate(url: string) {
    try {
      console.log(`Navigating to ${url}`);
      await this.page.goto(url);
    } catch (e) {
      console.error(`Navigation failed: ${e}`);
      throw e;
    }
  }

  async reload() {
    try {
      await this.page.reload();
    } catch (e) {
      console.error(`Reload failed: ${e}`);
      throw e;
    }
  }

  async goBack() {
    try {
      await this.page.goBack();
    } catch (e) {
      console.error(`Go back failed: ${e}`);
      throw e;
    }
  }

  async goForward() {
    try {
      await this.page.goForward();
    } catch (e) {
      console.error(`Go forward failed: ${e}`);
      throw e;
    }
  }

  // ================= ACTIONS =================
  async click(locator: Locator, name?: string) {
    try {
      console.log(`Clicking ${name || "element"}`);
      await expect(locator).toBeVisible();
      await locator.click();
    } catch (e) {
      console.error(`Click failed on ${name}: ${e}`);
      throw e;
    }
  }

  async clickByRole(role: string, name: string) {
    try {
      const locator = this.page.getByRole(role as any, { name });
      console.log(`Clicking role: ${role}, name: ${name}`);
      await expect(locator).toBeVisible();
      await locator.click();
    } catch (e) {
      console.error(`clickByRole failed: ${e}`);
      throw e;
    }
  }

  async clickByText(text: string) {
    try {
      const locator = this.page.getByText(text);
      console.log(`Clicking text: ${text}`);
      await expect(locator).toBeVisible();
      await locator.click();
    } catch (e) {
      console.error(`clickByText failed: ${e}`);
      throw e;
    }
  }

  async clickByLabel(label: string) {
    try {
      const locator = this.page.getByLabel(label);
      console.log(`Clicking label: ${label}`);
      await expect(locator).toBeVisible();
      await locator.click();
    } catch (e) {
      console.error(`clickByLabel failed: ${e}`);
      throw e;
    }
  }

  async clickByPlaceholder(placeholder: string) {
    try {
      const locator = this.page.getByPlaceholder(placeholder);
      console.log(`Clicking placeholder: ${placeholder}`);
      await expect(locator).toBeVisible();
      await locator.click();
    } catch (e) {
      console.error(`clickByPlaceholder failed: ${e}`);
      throw e;
    }
  }

  async clickByTestId(testId: string) {
    try {
      const locator = this.page.getByTestId(testId);
      console.log(`Clicking testId: ${testId}`);
      await expect(locator).toBeVisible();
      await locator.click();
    } catch (e) {
      console.error(`clickByTestId failed: ${e}`);
      throw e;
    }
  }

  async clickByAltText(text: string) {
    try {
      const locator = this.page.getByAltText(text);
      console.log(`Clicking alt text: ${text}`);
      await expect(locator).toBeVisible();
      await locator.click();
    } catch (e) {
      console.error(`clickByAltText failed: ${e}`);
      throw e;
    }
  }

  async clickByTitle(title: string) {
    try {
      const locator = this.page.getByTitle(title);
      console.log(`Clicking title: ${title}`);
      await expect(locator).toBeVisible();
      await locator.click();
    } catch (e) {
      console.error(`clickByTitle failed: ${e}`);
      throw e;
    }
  }

  async clickWithModifier(
    locator: Locator,
    modifier: "Alt" | "Control" | "Meta" | "Shift",
    name?: string
  ) {
    try {
      console.log(
        `Clicking ${name || "element"} with modifier: ${modifier}`
      );
      await expect(locator).toBeVisible();
      await locator.click({ modifiers: [modifier] });
    } catch (e) {
      console.error(`clickWithModifier failed on ${name}: ${e}`);
      throw e;
    }
  }

  async fill(locator: Locator, value: string, name?: string) {
    try {
      console.log(`Filling ${name || "field"} with ${value}`);
      await expect(locator).toBeVisible();
      await locator.fill(value);
    } catch (e) {
      console.error(`Fill failed on ${name}: ${e}`);
      throw e;
    }
  }

  async fillByRole(role: string, name: string, value: string) {
    try {
      const locator = this.page.getByRole(role as any, { name });
      console.log(`Filling role: ${role}, name: ${name} with ${value}`);
      await expect(locator).toBeVisible();
      await locator.fill(value);
    } catch (e) {
      console.error(`fillByRole failed: ${e}`);
      throw e;
    }
  }

  async fillByLabel(label: string, value: string) {
    try {
      const locator = this.page.getByLabel(label);
      console.log(`Filling label: ${label} with ${value}`);
      await expect(locator).toBeVisible();
      await locator.fill(value);
    } catch (e) {
      console.error(`fillByLabel failed: ${e}`);
      throw e;
    }
  }

  async fillByPlaceholder(placeholder: string, value: string) {
    try {
      const locator = this.page.getByPlaceholder(placeholder);
      console.log(`Filling placeholder: ${placeholder} with ${value}`);
      await expect(locator).toBeVisible();
      await locator.fill(value);
    } catch (e) {
      console.error(`fillByPlaceholder failed: ${e}`);
      throw e;
    }
  }

  async fillByTestId(testId: string, value: string) {
    try {
      const locator = this.page.getByTestId(testId);
      console.log(`Filling testId: ${testId} with ${value}`);
      await expect(locator).toBeVisible();
      await locator.fill(value);
    } catch (e) {
      console.error(`fillByTestId failed: ${e}`);
      throw e;
    }
  }

  async clearAndFill(locator: Locator, value: string, name?: string) {
    try {
      console.log(`Clearing and filling ${name || "field"} with ${value}`);
      await expect(locator).toBeVisible();
      await locator.clear();
      await locator.fill(value);
    } catch (e) {
      console.error(`clearAndFill failed on ${name}: ${e}`);
      throw e;
    }
  }

  async clearAndFillByLabel(label: string, value: string) {
    try {
      const locator = this.page.getByLabel(label);
      console.log(`Clearing and filling label: ${label} with ${value}`);
      await expect(locator).toBeVisible();
      await locator.clear();
      await locator.fill(value);
    } catch (e) {
      console.error(`clearAndFillByLabel failed: ${e}`);
      throw e;
    }
  }

  async clearAndFillByPlaceholder(placeholder: string, value: string) {
    try {
      const locator = this.page.getByPlaceholder(placeholder);
      console.log(
        `Clearing and filling placeholder: ${placeholder} with ${value}`
      );
      await expect(locator).toBeVisible();
      await locator.clear();
      await locator.fill(value);
    } catch (e) {
      console.error(`clearAndFillByPlaceholder failed: ${e}`);
      throw e;
    }
  }

  async typeSlowly(locator: Locator, value: string, delay = 100, name?: string) {
    try {
      console.log(`Typing slowly into ${name || "field"}: ${value}`);
      await expect(locator).toBeVisible();
      await locator.pressSequentially(value, { delay });
    } catch (e) {
      console.error(`typeSlowly failed on ${name}: ${e}`);
      throw e;
    }
  }

  async typeSlowlyByLabel(label: string, value: string, delay = 100) {
    try {
      const locator = this.page.getByLabel(label);
      console.log(`Typing slowly into label: ${label}: ${value}`);
      await expect(locator).toBeVisible();
      await locator.pressSequentially(value, { delay });
    } catch (e) {
      console.error(`typeSlowlyByLabel failed: ${e}`);
      throw e;
    }
  }

  async typeSlowlyByPlaceholder(
    placeholder: string,
    value: string,
    delay = 100
  ) {
    try {
      const locator = this.page.getByPlaceholder(placeholder);
      console.log(
        `Typing slowly into placeholder: ${placeholder}: ${value}`
      );
      await expect(locator).toBeVisible();
      await locator.pressSequentially(value, { delay });
    } catch (e) {
      console.error(`typeSlowlyByPlaceholder failed: ${e}`);
      throw e;
    }
  }

  async clear(locator: Locator) {
    try {
      await locator.clear();
    } catch (e) {
      console.error(`Clear failed: ${e}`);
      throw e;
    }
  }

  async hover(locator: Locator) {
    try {
      await locator.hover();
    } catch (e) {
      console.error(`Hover failed: ${e}`);
      throw e;
    }
  }

  async hoverByRole(role: string, name: string) {
    try {
      const locator = this.page.getByRole(role as any, { name });
      console.log(`Hovering role: ${role}, name: ${name}`);
      await locator.hover();
    } catch (e) {
      console.error(`hoverByRole failed: ${e}`);
      throw e;
    }
  }

  async hoverByTestId(testId: string) {
    try {
      const locator = this.page.getByTestId(testId);
      console.log(`Hovering testId: ${testId}`);
      await locator.hover();
    } catch (e) {
      console.error(`hoverByTestId failed: ${e}`);
      throw e;
    }
  }

  async doubleClick(locator: Locator) {
    try {
      await locator.dblclick();
    } catch (e) {
      console.error(`Double click failed: ${e}`);
      throw e;
    }
  }

  async doubleClickByRole(role: string, name: string) {
    try {
      const locator = this.page.getByRole(role as any, { name });
      console.log(`Double clicking role: ${role}, name: ${name}`);
      await locator.dblclick();
    } catch (e) {
      console.error(`doubleClickByRole failed: ${e}`);
      throw e;
    }
  }

  async doubleClickByTestId(testId: string) {
    try {
      const locator = this.page.getByTestId(testId);
      console.log(`Double clicking testId: ${testId}`);
      await locator.dblclick();
    } catch (e) {
      console.error(`doubleClickByTestId failed: ${e}`);
      throw e;
    }
  }

  async rightClick(locator: Locator) {
    try {
      console.log(`Right clicking element`);
      await locator.click({ button: "right" });
    } catch (e) {
      console.error(`Right click failed: ${e}`);
      throw e;
    }
  }

  async rightClickbyRole(role: string, name: string) {
    try {
      console.log(`Right clicking ${name || "element"}`);
      const locator = this.page.getByRole(role as any, { name });
      await locator.click({ button: "right" });
    } catch (e) {
      console.error(`Right click failed: ${e}`);
      throw e;
    }
  }

  async rightClickbyTestId(testId: string) {
    try {
      console.log(`Right clicking ${testId || "element"}`);
      const locator = this.page.getByTestId(testId);
      await locator.click({ button: "right" });
    } catch (e) {
      console.error(`Right click failed: ${e}`);
      throw e;
    }
  }

  async rightClickbyPlaceholder(placeholder: string) {
    try {
      console.log(`Right clicking ${placeholder || "element"}`);
      const locator = this.page.getByPlaceholder(placeholder);
      await locator.click({ button: "right" });
    } catch (e) {
      console.error(`Right click failed: ${e}`);
      throw e;
    }
  }

  async focus(locator: Locator) {
    try {
      await locator.focus();
    } catch (e) {
      console.error(`Focus failed: ${e}`);
      throw e;
    }
  }

  async focusByRole(role: string, name: string) {
    try {
      const locator = this.page.getByRole(role as any, { name });
      console.log(`Focusing role: ${role}, name: ${name}`);
      await locator.focus();
    } catch (e) {
      console.error(`focusByRole failed: ${e}`);
      throw e;
    }
  }

  async blur(locator: Locator) {
    try {
      await locator.blur();
    } catch (e) {
      console.error(`Blur failed: ${e}`);
      throw e;
    }
  }

  async dragAndDrop(source: Locator, target: Locator) {
    try {
      console.log(`Dragging source to target`);
      await source.dragTo(target);
    } catch (e) {
      console.error(`dragAndDrop failed: ${e}`);
      throw e;
    }
  }

  async dragAndDropByTestId(sourceTestId: string, targetTestId: string) {
    try {
      console.log(
        `Dragging testId: ${sourceTestId} to testId: ${targetTestId}`
      );
      const source = this.page.getByTestId(sourceTestId);
      const target = this.page.getByTestId(targetTestId);
      await source.dragTo(target);
    } catch (e) {
      console.error(`dragAndDropByTestId failed: ${e}`);
      throw e;
    }
  }

  // ================= CHECKBOX / RADIO =================
  async check(locator: Locator, name?: string) {
    try {
      console.log(`Checking ${name || "checkbox"}`);
      await expect(locator).toBeVisible();
      await locator.check();
    } catch (e) {
      console.error(`Check failed on ${name}: ${e}`);
      throw e;
    }
  }

  async checkByLabel(label: string) {
    try {
      const locator = this.page.getByLabel(label);
      console.log(`Checking label: ${label}`);
      await expect(locator).toBeVisible();
      await locator.check();
    } catch (e) {
      console.error(`checkByLabel failed: ${e}`);
      throw e;
    }
  }

  async checkByTestId(testId: string) {
    try {
      const locator = this.page.getByTestId(testId);
      console.log(`Checking testId: ${testId}`);
      await expect(locator).toBeVisible();
      await locator.check();
    } catch (e) {
      console.error(`checkByTestId failed: ${e}`);
      throw e;
    }
  }

  async uncheck(locator: Locator, name?: string) {
    try {
      console.log(`Unchecking ${name || "checkbox"}`);
      await expect(locator).toBeVisible();
      await locator.uncheck();
    } catch (e) {
      console.error(`Uncheck failed on ${name}: ${e}`);
      throw e;
    }
  }

  async uncheckByLabel(label: string) {
    try {
      const locator = this.page.getByLabel(label);
      console.log(`Unchecking label: ${label}`);
      await expect(locator).toBeVisible();
      await locator.uncheck();
    } catch (e) {
      console.error(`uncheckByLabel failed: ${e}`);
      throw e;
    }
  }

  async uncheckByTestId(testId: string) {
    try {
      const locator = this.page.getByTestId(testId);
      console.log(`Unchecking testId: ${testId}`);
      await expect(locator).toBeVisible();
      await locator.uncheck();
    } catch (e) {
      console.error(`uncheckByTestId failed: ${e}`);
      throw e;
    }
  }

  // ================= DROPDOWN =================
  async selectByValue(locator: Locator, value: string) {
    try {
      await locator.selectOption(value);
    } catch (e) {
      console.error(`Select dropdown failed: ${e}`);
      throw e;
    }
  }

  async selectByLabel(locator: Locator, label: string) {
    try {
      console.log(`Selecting option by label: ${label}`);
      await locator.selectOption({ label });
    } catch (e) {
      console.error(`selectByLabel failed: ${e}`);
      throw e;
    }
  }

  async selectByIndex(locator: Locator, index: number) {
    try {
      console.log(`Selecting option by index: ${index}`);
      await locator.selectOption({ index });
    } catch (e) {
      console.error(`selectByIndex failed: ${e}`);
      throw e;
    }
  }

  async selectByTestId(testId: string, value: string) {
    try {
      const locator = this.page.getByTestId(testId);
      console.log(`Selecting testId: ${testId} with value: ${value}`);
      await locator.selectOption(value);
    } catch (e) {
      console.error(`selectByTestId failed: ${e}`);
      throw e;
    }
  }

  // ================= KEYBOARD =================
  async pressKey(key: string) {
    try {
      await this.page.keyboard.press(key);
    } catch (e) {
      console.error(`Key press failed: ${e}`);
      throw e;
    }
  }

  async pressKeyOnLocator(locator: Locator, key: string) {
    try {
      console.log(`Pressing key: ${key} on locator`);
      await locator.press(key);
    } catch (e) {
      console.error(`pressKeyOnLocator failed: ${e}`);
      throw e;
    }
  }

  async pressKeyOnRole(role: string, name: string, key: string) {
    try {
      const locator = this.page.getByRole(role as any, { name });
      console.log(`Pressing key: ${key} on role: ${role}, name: ${name}`);
      await locator.press(key);
    } catch (e) {
      console.error(`pressKeyOnRole failed: ${e}`);
      throw e;
    }
  }

  async pressKeyOnTestId(testId: string, key: string) {
    try {
      const locator = this.page.getByTestId(testId);
      console.log(`Pressing key: ${key} on testId: ${testId}`);
      await locator.press(key);
    } catch (e) {
      console.error(`pressKeyOnTestId failed: ${e}`);
      throw e;
    }
  }

  // ================= FILE UPLOAD =================
  async uploadFile(locator: Locator, filePath: string) {
    try {
      await locator.setInputFiles(filePath);
    } catch (e) {
      console.error(`File upload failed: ${e}`);
      throw e;
    }
  }

  async uploadFileByTestId(testId: string, filePath: string) {
    try {
      const locator = this.page.getByTestId(testId);
      console.log(`Uploading file to testId: ${testId}`);
      await locator.setInputFiles(filePath);
    } catch (e) {
      console.error(`uploadFileByTestId failed: ${e}`);
      throw e;
    }
  }

  async uploadMultipleFiles(locator: Locator, filePaths: string[]) {
    try {
      console.log(`Uploading ${filePaths.length} files`);
      await locator.setInputFiles(filePaths);
    } catch (e) {
      console.error(`uploadMultipleFiles failed: ${e}`);
      throw e;
    }
  }

  async clearFileUpload(locator: Locator) {
    try {
      await locator.setInputFiles([]);
    } catch (e) {
      console.error(`clearFileUpload failed: ${e}`);
      throw e;
    }
  }

  // ================= DOWNLOAD =================
  async downloadFile(locator: Locator): Promise<Download> {
    try {
      console.log(`Initiating file download`);
      const [download] = await Promise.all([
        this.page.waitForEvent("download"),
        locator.click(),
      ]);
      return download;
    } catch (e) {
      console.error(`downloadFile failed: ${e}`);
      throw e;
    }
  }

  async downloadFileByRole(role: string, name: string): Promise<Download> {
    try {
      console.log(`Initiating download via role: ${role}, name: ${name}`);
      const locator = this.page.getByRole(role as any, { name });
      const [download] = await Promise.all([
        this.page.waitForEvent("download"),
        locator.click(),
      ]);
      return download;
    } catch (e) {
      console.error(`downloadFileByRole failed: ${e}`);
      throw e;
    }
  }

  // ================= WAITS =================
  async waitForVisible(locator: Locator) {
    try {
      await locator.waitFor({ state: "visible" });
    } catch (e) {
      console.error(`Wait for visible failed: ${e}`);
      throw e;
    }
  }

  async waitForVisibleByRole(role: string, name: string) {
    try {
      await this.page
        .getByRole(role as any, { name })
        .waitFor({ state: "visible" });
    } catch (e) {
      console.error(`waitForVisibleByRole failed: ${e}`);
      throw e;
    }
  }

  async waitForVisibleByTestId(testId: string) {
    try {
      await this.page.getByTestId(testId).waitFor({ state: "visible" });
    } catch (e) {
      console.error(`waitForVisibleByTestId failed: ${e}`);
      throw e;
    }
  }

  async waitForVisibleByPlaceholder(placeholder: string) {
    try {
      await this.page
        .getByPlaceholder(placeholder)
        .waitFor({ state: "visible" });
    } catch (e) {
      console.error(`waitForVisibleByPlaceholder failed: ${e}`);
      throw e;
    }
  }

  async waitForVisibleByLabel(label: string) {
    try {
      await this.page.getByLabel(label).waitFor({ state: "visible" });
    } catch (e) {
      console.error(`waitForVisibleByLabel failed: ${e}`);
      throw e;
    }
  }

  async waitForVisibleByAltText(altText: string) {
    try {
      await this.page.getByAltText(altText).waitFor({ state: "visible" });
    } catch (e) {
      console.error(`waitForVisibleByAltText failed: ${e}`);
      throw e;
    }
  }

  async waitForHidden(locator: Locator) {
    try {
      await locator.waitFor({ state: "hidden" });
    } catch (e) {
      console.error(`Wait for hidden failed: ${e}`);
      throw e;
    }
  }

  async waitForHiddenByRole(role: string, name: string) {
    try {
      await this.page
        .getByRole(role as any, { name })
        .waitFor({ state: "hidden" });
    } catch (e) {
      console.error(`waitForHiddenByRole failed: ${e}`);
      throw e;
    }
  }

  async waitForHiddenByTestId(testId: string) {
    try {
      await this.page.getByTestId(testId).waitFor({ state: "hidden" });
    } catch (e) {
      console.error(`waitForHiddenByTestId failed: ${e}`);
      throw e;
    }
  }

  async waitForHiddenByPlaceholder(placeholder: string) {
    try {
      await this.page
        .getByPlaceholder(placeholder)
        .waitFor({ state: "hidden" });
    } catch (e) {
      console.error(`waitForHiddenByPlaceholder failed: ${e}`);
      throw e;
    }
  }

  async waitForHiddenByLabel(label: string) {
    try {
      await this.page.getByLabel(label).waitFor({ state: "hidden" });
    } catch (e) {
      console.error(`waitForHiddenByLabel failed: ${e}`);
      throw e;
    }
  }

  async waitForHiddenByAltText(altText: string) {
    try {
      await this.page.getByAltText(altText).waitFor({ state: "hidden" });
    } catch (e) {
      console.error(`waitForHiddenByAltText failed: ${e}`);
      throw e;
    }
  }

  async waitForURL(url: string) {
    try {
      await this.page.waitForURL(url);
    } catch (e) {
      console.error(`Wait for URL failed: ${e}`);
      throw e;
    }
  }

  async waitForLoad() {
    try {
      await this.page.waitForLoadState("load");
    } catch (e) {
      console.error(`Wait for load failed: ${e}`);
      throw e;
    }
  }

  async waitForNetworkIdle() {
    try {
      await this.page.waitForLoadState("networkidle");
    } catch (e) {
      console.error(`Wait for network idle failed: ${e}`);
      throw e;
    }
  }

  async waitForDomContentLoaded() {
    try {
      await this.page.waitForLoadState("domcontentloaded");
    } catch (e) {
      console.error(`Wait for DOM content loaded failed: ${e}`);
      throw e;
    }
  }

  async waitForSelector(selector: string, timeout = 30000) {
    try {
      console.log(`Waiting for selector: ${selector}`);
      await this.page.waitForSelector(selector, { timeout });
    } catch (e) {
      console.error(`waitForSelector failed: ${e}`);
      throw e;
    }
  }

  async waitForTimeout(ms: number) {
    try {
      console.log(`Waiting for ${ms}ms`);
      await this.page.waitForTimeout(ms);
    } catch (e) {
      console.error(`waitForTimeout failed: ${e}`);
      throw e;
    }
  }

  async waitForResponse(urlOrPattern: string | RegExp) {
    try {
      console.log(`Waiting for response: ${urlOrPattern}`);
      return await this.page.waitForResponse(urlOrPattern);
    } catch (e) {
      console.error(`waitForResponse failed: ${e}`);
      throw e;
    }
  }

  async waitForRequest(urlOrPattern: string | RegExp) {
    try {
      console.log(`Waiting for request: ${urlOrPattern}`);
      return await this.page.waitForRequest(urlOrPattern);
    } catch (e) {
      console.error(`waitForRequest failed: ${e}`);
      throw e;
    }
  }

  async waitForCount(locator: Locator, count: number, timeout = 30000) {
    try {
      console.log(`Waiting for count: ${count}`);
      await expect(locator).toHaveCount(count, { timeout });
    } catch (e) {
      console.error(`waitForCount failed: ${e}`);
      throw e;
    }
  }

  // ================= GETTERS =================
  async getText(locator: Locator): Promise<string> {
    try {
      await expect(locator).toBeVisible();
      return (await locator.textContent()) || "";
    } catch (e) {
      console.error(`Get text failed: ${e}`);
      throw e;
    }
  }

  async getTextByRole(role: string, name: string): Promise<string> {
    try {
      const locator = this.page.getByRole(role as any, { name });
      await expect(locator).toBeVisible();
      return (await locator.textContent()) || "";
    } catch (e) {
      console.error(`getTextByRole failed: ${e}`);
      throw e;
    }
  }

  async getTextByTestId(testId: string): Promise<string> {
    try {
      const locator = this.page.getByTestId(testId);
      await expect(locator).toBeVisible();
      return (await locator.textContent()) || "";
    } catch (e) {
      console.error(`getTextByTestId failed: ${e}`);
      throw e;
    }
  }

  async getAllTexts(locator: Locator): Promise<string[]> {
    try {
      return await locator.allTextContents();
    } catch (e) {
      console.error(`getAllTexts failed: ${e}`);
      throw e;
    }
  }

  async getAllTextsByRole(role: string, name: string): Promise<string[]> {
    try {
      const locator = this.page.getByRole(role as any, { name });
      return await locator.allTextContents();
    } catch (e) {
      console.error(`getAllTextsByRole failed: ${e}`);
      throw e;
    }
  }

  async getAllTextsByTestId(testId: string): Promise<string[]> {
    try {
      return await this.page.getByTestId(testId).allTextContents();
    } catch (e) {
      console.error(`getAllTextsByTestId failed: ${e}`);
      throw e;
    }
  }

  async getInputValue(locator: Locator): Promise<string> {
    try {
      return await locator.inputValue();
    } catch (e) {
      console.error(`getInputValue failed: ${e}`);
      throw e;
    }
  }

  async getInputValueByLabel(label: string): Promise<string> {
    try {
      return await this.page.getByLabel(label).inputValue();
    } catch (e) {
      console.error(`getInputValueByLabel failed: ${e}`);
      throw e;
    }
  }

  async getInputValueByPlaceholder(placeholder: string): Promise<string> {
    try {
      return await this.page.getByPlaceholder(placeholder).inputValue();
    } catch (e) {
      console.error(`getInputValueByPlaceholder failed: ${e}`);
      throw e;
    }
  }

  async getInputValueByTestId(testId: string): Promise<string> {
    try {
      return await this.page.getByTestId(testId).inputValue();
    } catch (e) {
      console.error(`getInputValueByTestId failed: ${e}`);
      throw e;
    }
  }

  async getAttribute(locator: Locator, attr: string): Promise<string | null> {
    try {
      return await locator.getAttribute(attr);
    } catch (e) {
      console.error(`Get attribute failed: ${e}`);
      throw e;
    }
  }

  async getAttributeByTestId(
    testId: string,
    attr: string
  ): Promise<string | null> {
    try {
      return await this.page.getByTestId(testId).getAttribute(attr);
    } catch (e) {
      console.error(`getAttributeByTestId failed: ${e}`);
      throw e;
    }
  }

  async getTitle(): Promise<string> {
    try {
      return await this.page.title();
    } catch (e) {
      console.error(`Get title failed: ${e}`);
      throw e;
    }
  }

  async getCurrentURL(): Promise<string> {
    try {
      return this.page.url();
    } catch (e) {
      console.error(`getCurrentURL failed: ${e}`);
      throw e;
    }
  }

  async getCount(locator: Locator): Promise<number> {
    try {
      return await locator.count();
    } catch (e) {
      console.error(`getCount failed: ${e}`);
      throw e;
    }
  }

  async getCountByRole(role: string, name: string): Promise<number> {
    try {
      return await this.page.getByRole(role as any, { name }).count();
    } catch (e) {
      console.error(`getCountByRole failed: ${e}`);
      throw e;
    }
  }

  async getCountByTestId(testId: string): Promise<number> {
    try {
      return await this.page.getByTestId(testId).count();
    } catch (e) {
      console.error(`getCountByTestId failed: ${e}`);
      throw e;
    }
  }

  // ================= BOOLEAN STATE CHECKS =================
  async isVisible(locator: Locator): Promise<boolean> {
    try {
      return await locator.isVisible();
    } catch (e) {
      console.error(`isVisible failed: ${e}`);
      throw e;
    }
  }

  async isVisibleByRole(role: string, name: string): Promise<boolean> {
    try {
      return await this.page.getByRole(role as any, { name }).isVisible();
    } catch (e) {
      console.error(`isVisibleByRole failed: ${e}`);
      throw e;
    }
  }

  async isVisibleByTestId(testId: string): Promise<boolean> {
    try {
      return await this.page.getByTestId(testId).isVisible();
    } catch (e) {
      console.error(`isVisibleByTestId failed: ${e}`);
      throw e;
    }
  }

  async isEnabled(locator: Locator): Promise<boolean> {
    try {
      return await locator.isEnabled();
    } catch (e) {
      console.error(`isEnabled failed: ${e}`);
      throw e;
    }
  }

  async isEnabledByRole(role: string, name: string): Promise<boolean> {
    try {
      return await this.page.getByRole(role as any, { name }).isEnabled();
    } catch (e) {
      console.error(`isEnabledByRole failed: ${e}`);
      throw e;
    }
  }

  async isEnabledByTestId(testId: string): Promise<boolean> {
    try {
      return await this.page.getByTestId(testId).isEnabled();
    } catch (e) {
      console.error(`isEnabledByTestId failed: ${e}`);
      throw e;
    }
  }

  async isChecked(locator: Locator): Promise<boolean> {
    try {
      return await locator.isChecked();
    } catch (e) {
      console.error(`isChecked failed: ${e}`);
      throw e;
    }
  }

  async isCheckedByLabel(label: string): Promise<boolean> {
    try {
      return await this.page.getByLabel(label).isChecked();
    } catch (e) {
      console.error(`isCheckedByLabel failed: ${e}`);
      throw e;
    }
  }

  async isCheckedByTestId(testId: string): Promise<boolean> {
    try {
      return await this.page.getByTestId(testId).isChecked();
    } catch (e) {
      console.error(`isCheckedByTestId failed: ${e}`);
      throw e;
    }
  }

  async isDisabled(locator: Locator): Promise<boolean> {
    try {
      return await locator.isDisabled();
    } catch (e) {
      console.error(`isDisabled failed: ${e}`);
      throw e;
    }
  }

  async isDisabledByRole(role: string, name: string): Promise<boolean> {
    try {
      return await this.page.getByRole(role as any, { name }).isDisabled();
    } catch (e) {
      console.error(`isDisabledByRole failed: ${e}`);
      throw e;
    }
  }

  async isDisabledByTestId(testId: string): Promise<boolean> {
    try {
      return await this.page.getByTestId(testId).isDisabled();
    } catch (e) {
      console.error(`isDisabledByTestId failed: ${e}`);
      throw e;
    }
  }

  // ================= ASSERTIONS =================
  async assertText(locator: Locator, expected: string) {
    try {
      await expect(locator).toHaveText(expected);
    } catch (e) {
      console.error(`Assertion failed: ${e}`);
      throw e;
    }
  }

  async assertTextByRole(role: string, name: string, expected: string) {
    try {
      const locator = this.page.getByRole(role as any, { name });
      await expect(locator).toHaveText(expected);
    } catch (e) {
      console.error(`assertTextByRole failed: ${e}`);
      throw e;
    }
  }

  async assertTextByTestId(testId: string, expected: string) {
    try {
      await expect(this.page.getByTestId(testId)).toHaveText(expected);
    } catch (e) {
      console.error(`assertTextByTestId failed: ${e}`);
      throw e;
    }
  }

  async assertContainsText(locator: Locator, expected: string) {
    try {
      await expect(locator).toContainText(expected);
    } catch (e) {
      console.error(`assertContainsText failed: ${e}`);
      throw e;
    }
  }

  async assertContainsTextByRole(role: string, name: string, expected: string) {
    try {
      const locator = this.page.getByRole(role as any, { name });
      await expect(locator).toContainText(expected);
    } catch (e) {
      console.error(`assertContainsTextByRole failed: ${e}`);
      throw e;
    }
  }

  async assertContainsTextByTestId(testId: string, expected: string) {
    try {
      await expect(this.page.getByTestId(testId)).toContainText(expected);
    } catch (e) {
      console.error(`assertContainsTextByTestId failed: ${e}`);
      throw e;
    }
  }

  async assertVisible(locator: Locator) {
    try {
      await expect(locator).toBeVisible();
    } catch (e) {
      console.error(`Visibility assertion failed: ${e}`);
      throw e;
    }
  }

  async assertVisibleByRole(role: string, name: string) {
    try {
      await expect(this.page.getByRole(role as any, { name })).toBeVisible();
    } catch (e) {
      console.error(`assertVisibleByRole failed: ${e}`);
      throw e;
    }
  }

  async assertVisibleByTestId(testId: string) {
    try {
      await expect(this.page.getByTestId(testId)).toBeVisible();
    } catch (e) {
      console.error(`assertVisibleByTestId failed: ${e}`);
      throw e;
    }
  }

  async assertNotVisible(locator: Locator) {
    try {
      await expect(locator).not.toBeVisible();
    } catch (e) {
      console.error(`assertNotVisible failed: ${e}`);
      throw e;
    }
  }

  async assertNotVisibleByRole(role: string, name: string) {
    try {
      await expect(
        this.page.getByRole(role as any, { name })
      ).not.toBeVisible();
    } catch (e) {
      console.error(`assertNotVisibleByRole failed: ${e}`);
      throw e;
    }
  }

  async assertNotVisibleByTestId(testId: string) {
    try {
      await expect(this.page.getByTestId(testId)).not.toBeVisible();
    } catch (e) {
      console.error(`assertNotVisibleByTestId failed: ${e}`);
      throw e;
    }
  }

  async assertEnabled(locator: Locator) {
    try {
      await expect(locator).toBeEnabled();
    } catch (e) {
      console.error(`assertEnabled failed: ${e}`);
      throw e;
    }
  }

  async assertEnabledByRole(role: string, name: string) {
    try {
      await expect(this.page.getByRole(role as any, { name })).toBeEnabled();
    } catch (e) {
      console.error(`assertEnabledByRole failed: ${e}`);
      throw e;
    }
  }

  async assertEnabledByTestId(testId: string) {
    try {
      await expect(this.page.getByTestId(testId)).toBeEnabled();
    } catch (e) {
      console.error(`assertEnabledByTestId failed: ${e}`);
      throw e;
    }
  }

  async assertDisabled(locator: Locator) {
    try {
      await expect(locator).toBeDisabled();
    } catch (e) {
      console.error(`assertDisabled failed: ${e}`);
      throw e;
    }
  }

  async assertDisabledByRole(role: string, name: string) {
    try {
      await expect(this.page.getByRole(role as any, { name })).toBeDisabled();
    } catch (e) {
      console.error(`assertDisabledByRole failed: ${e}`);
      throw e;
    }
  }

  async assertDisabledByTestId(testId: string) {
    try {
      await expect(this.page.getByTestId(testId)).toBeDisabled();
    } catch (e) {
      console.error(`assertDisabledByTestId failed: ${e}`);
      throw e;
    }
  }

  async assertChecked(locator: Locator) {
    try {
      await expect(locator).toBeChecked();
    } catch (e) {
      console.error(`assertChecked failed: ${e}`);
      throw e;
    }
  }

  async assertCheckedByLabel(label: string) {
    try {
      await expect(this.page.getByLabel(label)).toBeChecked();
    } catch (e) {
      console.error(`assertCheckedByLabel failed: ${e}`);
      throw e;
    }
  }

  async assertCheckedByTestId(testId: string) {
    try {
      await expect(this.page.getByTestId(testId)).toBeChecked();
    } catch (e) {
      console.error(`assertCheckedByTestId failed: ${e}`);
      throw e;
    }
  }

  async assertUnchecked(locator: Locator) {
    try {
      await expect(locator).not.toBeChecked();
    } catch (e) {
      console.error(`assertUnchecked failed: ${e}`);
      throw e;
    }
  }

  async assertUncheckedByLabel(label: string) {
    try {
      await expect(this.page.getByLabel(label)).not.toBeChecked();
    } catch (e) {
      console.error(`assertUncheckedByLabel failed: ${e}`);
      throw e;
    }
  }

  async assertUncheckedByTestId(testId: string) {
    try {
      await expect(this.page.getByTestId(testId)).not.toBeChecked();
    } catch (e) {
      console.error(`assertUncheckedByTestId failed: ${e}`);
      throw e;
    }
  }

  async assertInputValue(locator: Locator, expected: string) {
    try {
      await expect(locator).toHaveValue(expected);
    } catch (e) {
      console.error(`assertInputValue failed: ${e}`);
      throw e;
    }
  }

  async assertInputValueByLabel(label: string, expected: string) {
    try {
      await expect(this.page.getByLabel(label)).toHaveValue(expected);
    } catch (e) {
      console.error(`assertInputValueByLabel failed: ${e}`);
      throw e;
    }
  }

  async assertInputValueByTestId(testId: string, expected: string) {
    try {
      await expect(this.page.getByTestId(testId)).toHaveValue(expected);
    } catch (e) {
      console.error(`assertInputValueByTestId failed: ${e}`);
      throw e;
    }
  }

  async assertAttributeValue(
    locator: Locator,
    attr: string,
    expected: string
  ) {
    try {
      await expect(locator).toHaveAttribute(attr, expected);
    } catch (e) {
      console.error(`assertAttributeValue failed: ${e}`);
      throw e;
    }
  }

  async assertAttributeValueByTestId(
    testId: string,
    attr: string,
    expected: string
  ) {
    try {
      await expect(this.page.getByTestId(testId)).toHaveAttribute(
        attr,
        expected
      );
    } catch (e) {
      console.error(`assertAttributeValueByTestId failed: ${e}`);
      throw e;
    }
  }

  async assertCount(locator: Locator, expected: number) {
    try {
      await expect(locator).toHaveCount(expected);
    } catch (e) {
      console.error(`assertCount failed: ${e}`);
      throw e;
    }
  }

  async assertCountByTestId(testId: string, expected: number) {
    try {
      await expect(this.page.getByTestId(testId)).toHaveCount(expected);
    } catch (e) {
      console.error(`assertCountByTestId failed: ${e}`);
      throw e;
    }
  }

  async assertURL(expected: string) {
    try {
      await expect(this.page).toHaveURL(expected);
    } catch (e) {
      console.error(`URL assertion failed: ${e}`);
      throw e;
    }
  }

  async assertURLContains(partial: string) {
    try {
      await expect(this.page).toHaveURL(new RegExp(partial));
    } catch (e) {
      console.error(`assertURLContains failed: ${e}`);
      throw e;
    }
  }

  async assertTitle(expected: string) {
    try {
      await expect(this.page).toHaveTitle(expected);
    } catch (e) {
      console.error(`assertTitle failed: ${e}`);
      throw e;
    }
  }

  async assertTitleContains(partial: string) {
    try {
      await expect(this.page).toHaveTitle(new RegExp(partial));
    } catch (e) {
      console.error(`assertTitleContains failed: ${e}`);
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
      console.error(`getFrameByName failed: ${e}`);
      throw e;
    }
  }

  async getFrameByURL(url: string | RegExp): Promise<Frame> {
    try {
      const frame = this.page.frame({ url });
      if (!frame) throw new Error(`Frame with URL "${url}" not found`);
      return frame;
    } catch (e) {
      console.error(`getFrameByURL failed: ${e}`);
      throw e;
    }
  }

  async clickInFrame(frame: Frame, selector: string) {
    try {
      console.log(`Clicking selector in frame: ${selector}`);
      await frame.click(selector);
    } catch (e) {
      console.error(`clickInFrame failed: ${e}`);
      throw e;
    }
  }

  async fillInFrame(frame: Frame, selector: string, value: string) {
    try {
      console.log(`Filling selector in frame: ${selector} with ${value}`);
      await frame.fill(selector, value);
    } catch (e) {
      console.error(`fillInFrame failed: ${e}`);
      throw e;
    }
  }

  // ================= DIALOG HANDLING =================
  async acceptDialog() {
    try {
      console.log(`Setting up dialog accept handler`);
      this.page.once("dialog", async (dialog) => {
        console.log(`Accepting dialog: ${dialog.type()} - ${dialog.message()}`);
        await dialog.accept();
      });
    } catch (e) {
      console.error(`acceptDialog failed: ${e}`);
      throw e;
    }
  }

  async dismissDialog() {
    try {
      console.log(`Setting up dialog dismiss handler`);
      this.page.once("dialog", async (dialog) => {
        console.log(
          `Dismissing dialog: ${dialog.type()} - ${dialog.message()}`
        );
        await dialog.dismiss();
      });
    } catch (e) {
      console.error(`dismissDialog failed: ${e}`);
      throw e;
    }
  }

  async acceptDialogWithText(promptText: string) {
    try {
      console.log(`Setting up dialog accept handler with text: ${promptText}`);
      this.page.once("dialog", async (dialog) => {
        console.log(`Accepting dialog with text: ${promptText}`);
        await dialog.accept(promptText);
      });
    } catch (e) {
      console.error(`acceptDialogWithText failed: ${e}`);
      throw e;
    }
  }

  async handleDialogAndGetMessage(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.page.once("dialog", async (dialog) => {
        try {
          const message = dialog.message();
          console.log(`Dialog message: ${message}`);
          await dialog.dismiss();
          resolve(message);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  // ================= NEW TAB / WINDOW HANDLING =================
  async clickAndWaitForNewPage(locator: Locator): Promise<Page> {
    try {
      console.log(`Clicking element and waiting for new page`);
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent("page"),
        locator.click(),
      ]);
      await newPage.waitForLoadState();
      return newPage;
    } catch (e) {
      console.error(`clickAndWaitForNewPage failed: ${e}`);
      throw e;
    }
  }

  async clickByRoleAndWaitForNewPage(
    role: string,
    name: string
  ): Promise<Page> {
    try {
      const locator = this.page.getByRole(role as any, { name });
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent("page"),
        locator.click(),
      ]);
      await newPage.waitForLoadState();
      return newPage;
    } catch (e) {
      console.error(`clickByRoleAndWaitForNewPage failed: ${e}`);
      throw e;
    }
  }

  async getAllOpenPages(): Promise<Page[]> {
    try {
      return this.page.context().pages();
    } catch (e) {
      console.error(`getAllOpenPages failed: ${e}`);
      throw e;
    }
  }

  // ================= NETWORK INTERCEPT =================
  async interceptRequest(
    urlPattern: string | RegExp,
    handler: (route: any) => Promise<void>
  ) {
    try {
      console.log(`Intercepting requests matching: ${urlPattern}`);
      await this.page.route(urlPattern, handler);
    } catch (e) {
      console.error(`interceptRequest failed: ${e}`);
      throw e;
    }
  }

  async mockResponse(
    urlPattern: string | RegExp,
    body: object,
    status = 200
  ) {
    try {
      console.log(`Mocking response for: ${urlPattern}`);
      await this.page.route(urlPattern, (route) =>
        route.fulfill({
          status,
          contentType: "application/json",
          body: JSON.stringify(body),
        })
      );
    } catch (e) {
      console.error(`mockResponse failed: ${e}`);
      throw e;
    }
  }

  async abortRequest(urlPattern: string | RegExp) {
    try {
      console.log(`Aborting requests matching: ${urlPattern}`);
      await this.page.route(urlPattern, (route) => route.abort());
    } catch (e) {
      console.error(`abortRequest failed: ${e}`);
      throw e;
    }
  }

  async removeInterceptor(urlPattern: string | RegExp) {
    try {
      console.log(`Removing route interceptor for: ${urlPattern}`);
      await this.page.unroute(urlPattern);
    } catch (e) {
      console.error(`removeInterceptor failed: ${e}`);
      throw e;
    }
  }

  // ================= CLIPBOARD =================
  async copyToClipboard(text: string) {
    try {
      console.log(`Copying to clipboard: ${text}`);
      await this.page.evaluate((t) => navigator.clipboard.writeText(t), text);
    } catch (e) {
      console.error(`copyToClipboard failed: ${e}`);
      throw e;
    }
  }

  async getClipboardText(): Promise<string> {
    try {
      return await this.page.evaluate(() => navigator.clipboard.readText());
    } catch (e) {
      console.error(`getClipboardText failed: ${e}`);
      throw e;
    }
  }

  // ================= JAVASCRIPT EXECUTION =================
  async executeScript<T>(script: string | ((...args: any[]) => T), ...args: any[]): Promise<T> {
    try {
      console.log(`Executing script`);
      return await this.page.evaluate(script as any, ...args);
    } catch (e) {
      console.error(`executeScript failed: ${e}`);
      throw e;
    }
  }

  async executeScriptOnLocator<T>(
    locator: Locator,
    script: (element: Element, ...args: any[]) => T,
    ...args: any[]
  ): Promise<T> {
    try {
      console.log(`Executing script on locator`);
      return await locator.evaluate(script, ...args);
    } catch (e) {
      console.error(`executeScriptOnLocator failed: ${e}`);
      throw e;
    }
  }

  // ================= SCREENSHOT =================
  async takeScreenshot(path: string) {
    try {
      await this.page.screenshot({ path });
    } catch (e) {
      console.error(`Screenshot failed: ${e}`);
      throw e;
    }
  }

  async takeFullPageScreenshot(path: string) {
    try {
      await this.page.screenshot({ path, fullPage: true });
    } catch (e) {
      console.error(`takeFullPageScreenshot failed: ${e}`);
      throw e;
    }
  }

  async takeLocatorScreenshot(locator: Locator, path: string) {
    try {
      await locator.screenshot({ path });
    } catch (e) {
      console.error(`takeLocatorScreenshot failed: ${e}`);
      throw e;
    }
  }

  // ================= SCROLL =================
  async scrollIntoView(locator: Locator) {
    try {
      await locator.scrollIntoViewIfNeeded();
    } catch (e) {
      console.error(`Scroll failed: ${e}`);
      throw e;
    }
  }

  async scrollIntoViewByTestId(testId: string) {
    try {
      await this.page.getByTestId(testId).scrollIntoViewIfNeeded();
    } catch (e) {
      console.error(`scrollIntoViewByTestId failed: ${e}`);
      throw e;
    }
  }

  async scrollToTop() {
    try {
      await this.page.keyboard.press("Control+Home");
    } catch (e) {
      console.error(`scrollToTop failed: ${e}`);
      throw e;
    }
  }

  async scrollToBottom() {
    try {
      await this.page.keyboard.press("Control+End");
    } catch (e) {
      console.error(`scrollToBottom failed: ${e}`);
      throw e;
    }
  }

  async scrollByPixels(x: number, y: number) {
    try {
      console.log(`Scrolling by x: ${x}, y: ${y}`);
      await this.page.mouse.wheel(x, y);
    } catch (e) {
      console.error(`scrollByPixels failed: ${e}`);
      throw e;
    }
  }
}