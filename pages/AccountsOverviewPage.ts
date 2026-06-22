import { expect, Locator, Page } from '@playwright/test';
import { Logger } from '../utils/Logger';

export class AccountsOverviewPage {
  readonly page: Page;
  readonly accountsOverviewTitle: Locator;
  readonly accountRows: Locator;
  readonly accountsTable: Locator;
  readonly balanceCells: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountsOverviewTitle = page.getByRole('heading', { name: 'Accounts Overview' });
    this.accountRows = page.locator('#accountTable tbody tr');
    this.accountsTable = page.locator('#accountTable');
    this.balanceCells = this.accountRows.locator('td:nth-child(2)');
  }
  async verifyPageLoaded(): Promise<void> {
    Logger.info('Verifying Accounts Overview page loaded');
    await expect(this.accountsOverviewTitle).toBeVisible();
  }

  async verifyAccountsExist(): Promise<void> {
    Logger.info('Verifying accounts exist in Accounts Overview');
    await expect(this.accountRows.first()).toBeVisible();
    expect(await this.accountRows.count()).toBeGreaterThan(0);
  }

  async getAccountsCount(): Promise<number> {
    Logger.info('Getting accounts count from Accounts Overview');
    return await this.accountRows.count();
  }

  async getFirstAccountNumber(): Promise<string> {
    Logger.info('Getting first account number from Accounts Overview');
    const accountLink = this.accountRows.locator('td a').first();

    return (await accountLink.textContent()) ?? '';
  }

  async verifyAccountExists(accountNumber: string): Promise<void> {
    Logger.info(`Verifying account exists with number ${accountNumber}`);
    await expect(
      this.page.getByRole('link', {
        name: accountNumber,
      }),
    ).toBeVisible();
  }

  async verifyBalancesDisplayed(): Promise<void> {
    Logger.info('Verifying balances are displayed in Accounts Overview');
    await expect(this.balanceCells.first()).toBeVisible();
  }

  async openAccount(accountId: number): Promise<void> {
    Logger.info(`Opening account with id ${accountId}`);
    await this.page.getByRole('link', { name: String(accountId) }).click();
  }

  async openFirstAccount(): Promise<void> {
    Logger.info('Opening first account from Accounts Overview');
    await this.accountRows.first().locator('td:first-child a').click();
  }
}
