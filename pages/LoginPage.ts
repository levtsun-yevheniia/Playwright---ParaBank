import { expect, Locator, Page } from '@playwright/test';
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[value="Log In"]');
    this.errorMessage = page.getByRole('heading', { name: 'Error!' });
  }
  async open(): Promise<void> {
    await this.page.goto('/');
  }
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  async verifyLoginError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }
}
