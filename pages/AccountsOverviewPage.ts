import { expect, Locator, Page } from '@playwright/test';
export class AccountsOverviewPage {
  readonly page: Page;
  readonly accountsOverviewTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountsOverviewTitle = page.getByRole('heading', { name: 'Accounts Overview' });
  }
  async verifyPageLoaded(): Promise<void> {
    await expect(this.accountsOverviewTitle).toBeVisible();
  }
}
