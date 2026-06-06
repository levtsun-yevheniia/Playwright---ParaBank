import { expect, Locator, Page } from '@playwright/test';
export class AccountsOverviewPage {
  readonly page: Page;
  readonly accountsOverviewTitle: Locator;
  readonly accountRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountsOverviewTitle = page.getByRole('heading', { name: 'Accounts Overview' });
    this.accountRows = page.locator('#accountTable tbody tr');
  }
  async verifyPageLoaded(): Promise<void> {
    await expect(this.accountsOverviewTitle).toBeVisible();
  }

  async getAccountsCount(): Promise<number> {
    return await this.accountRows.count();
  }

  async getFirstAccountNumber(): Promise<string> {
    const accountLink = this.page.locator('#accountTable tbody tr td a').first();

    return (await accountLink.textContent()) ?? '';
  }

  async verifyAccountExists(accountNumber: string): Promise<void> {
    await expect(
      this.page.getByRole('link', {
        name: accountNumber,
      }),
    ).toBeVisible();
  }
  async openAccount(accountId: number): Promise<void> {
    await this.page.getByRole('link', { name: String(accountId) }).click();
  }
}
