import { expect, Locator, Page } from '@playwright/test';
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
    await expect(this.accountsOverviewTitle).toBeVisible();
  }

  async verifyAccountsExist(): Promise<void> {
    await expect(this.accountRows.first()).toBeVisible();
    expect(await this.accountRows.count()).toBeGreaterThan(0);
  }

  async getAccountsCount(): Promise<number> {
    return await this.accountRows.count();
  }

  async getFirstAccountNumber(): Promise<string> {
    const accountLink = this.accountRows.locator('td a').first();

    return (await accountLink.textContent()) ?? '';
  }

  async verifyAccountExists(accountNumber: string): Promise<void> {
    await expect(
      this.page.getByRole('link', {
        name: accountNumber,
      }),
    ).toBeVisible();
  }

  async verifyBalancesDisplayed(): Promise<void> {
    await expect(this.balanceCells.first()).toBeVisible();
  }

  async openAccount(accountId: number): Promise<void> {
    await this.page.getByRole('link', { name: String(accountId) }).click();
  }

  async openFirstAccount(): Promise<void> {
    await this.accountRows.first().locator('td:first-child a').click();
  }
}
