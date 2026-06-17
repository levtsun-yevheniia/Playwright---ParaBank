import { expect, Locator, Page } from '@playwright/test';
export class AccountDetailsPage {
  readonly page: Page;
  readonly accountDetailsTitle: Locator;
  readonly accountNumber: Locator;
  readonly transactionTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountDetailsTitle = page.getByRole('heading', { name: 'Account Details' });
    this.accountNumber = page.locator('#accountId');
    this.transactionTable = page.locator('#transactionTable');
  }
  async verifyPageLoaded(): Promise<void> {
    await expect(this.accountDetailsTitle).toBeVisible();
  }
  async verifyAccountNumberDisplayed(): Promise<void> {
    await expect(this.accountNumber).toBeVisible();
  }
  async verifyTransactionTableDisplayed(): Promise<void> {
    await expect(this.transactionTable).toBeVisible();
  }
}
