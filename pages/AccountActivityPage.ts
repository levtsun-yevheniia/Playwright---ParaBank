import { expect, Locator, Page } from '@playwright/test';
import { Logger } from '../utils/Logger';
export class AccountActivityPage {
  constructor(private page: Page) {}

  private getTodayDate(): string {
    const today = new Date();

    const dd = today.getDate();
    const ddUpdated = dd - 1;

    const formattedDdUpdated = String(ddUpdated).padStart(2, '0');
    const yyyy = today.getFullYear();

    return `-${formattedDdUpdated}-${yyyy}`;
  }

  transactionRow(amount: string): Locator {
    const today = this.getTodayDate();

    Logger.info(`Finding transaction row with date ${today} and amount ${amount}`);

    return this.page
      .locator('tr', {
        has: this.page.getByRole('cell', { name: today }),
      })
      .filter({
        has: this.page.getByRole('cell', { name: amount }),
      });
  }

  async verifyTransactionVisible(amount: string): Promise<void> {
    const row = this.transactionRow(amount);

    Logger.info(`Verifying transaction row is visible`);
    await expect(row).toBeVisible();
  }
}
