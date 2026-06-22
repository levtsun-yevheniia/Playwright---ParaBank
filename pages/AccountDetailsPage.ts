import { expect, Locator, Page } from '@playwright/test';
import { Logger } from '../utils/Logger';

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
    Logger.info('Verifying Account Details page loaded');
    await expect(this.accountDetailsTitle).toBeVisible();
  }
  async verifyAccountNumberDisplayed(): Promise<void> {
    Logger.info('Verifying account number is displayed on Account Details page');
    await expect(this.accountNumber).toBeVisible();
  }
  async verifyTransactionTableDisplayed(): Promise<void> {
    Logger.info('Verifying transaction table is displayed on Account Details page');
    await expect(this.transactionTable).toBeVisible();
  }
}
