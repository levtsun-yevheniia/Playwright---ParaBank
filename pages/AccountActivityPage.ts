import { expect, Locator, Page } from '@playwright/test';
export class AccountActivityPage {
  constructor(private page: Page) {}

  transactionAmount(amount: string): Locator {
    return this.page.getByText(amount);
  }

  async verifyTransactionVisible(amount: string): Promise<void> {
    await expect(this.transactionAmount(amount)).toBeVisible();
  }
}
