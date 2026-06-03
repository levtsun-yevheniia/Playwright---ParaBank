import { expect, Locator, Page } from '@playwright/test';

export class OpenNewAccountPage {
  readonly page: Page;

  readonly accountTypeSelect: Locator;
  readonly fromAccountSelect: Locator;

  readonly openAccountButton: Locator;

  readonly successMessage: Locator;
  readonly newAccountId: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accountTypeSelect = page.locator('#type');

    this.fromAccountSelect = page.locator('#fromAccountId');

    this.openAccountButton = page.getByRole('button', {
      name: 'Open New Account',
    });

    this.successMessage = page.getByText('Account Opened!');

    this.newAccountId = page.locator('#newAccountId');
  }

  async createAccount(accountType: 'CHECKING' | 'SAVINGS', fromAccount: string): Promise<void> {
    await this.accountTypeSelect.selectOption(accountType);

    await this.fromAccountSelect.selectOption(fromAccount);

    await this.openAccountButton.click();
  }

  async verifyAccountCreated(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  async getNewAccountNumber(): Promise<string> {
    await expect(this.newAccountId).toBeVisible();

    return (await this.newAccountId.textContent()) ?? '';
  }
}
