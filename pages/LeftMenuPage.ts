import { Locator, Page } from '@playwright/test';
import { Logger } from '../utils/Logger';

export class LeftMenuPage {
  readonly page: Page;

  readonly openNewAccountLink: Locator;
  readonly accountsOverviewLink: Locator;
  readonly transferFundsLink: Locator;
  readonly billPayLink: Locator;
  readonly findTransactionsLink: Locator;
  readonly updateContactInfoLink: Locator;
  readonly requestLoanLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.openNewAccountLink = page.getByRole('link', {
      name: 'Open New Account',
    });

    this.accountsOverviewLink = page.getByRole('link', {
      name: 'Accounts Overview',
    });

    this.transferFundsLink = page.getByRole('link', {
      name: 'Transfer Funds',
    });

    this.billPayLink = page.getByRole('link', {
      name: 'Bill Pay',
    });

    this.findTransactionsLink = page.getByRole('link', {
      name: 'Find Transactions',
    });

    this.updateContactInfoLink = page.getByRole('link', {
      name: 'Update Contact Info',
    });

    this.requestLoanLink = page.getByRole('link', {
      name: 'Request Loan',
    });

    this.logoutLink = page.getByRole('link', {
      name: 'Log Out',
    });
  }

  async goToOpenNewAccount(): Promise<void> {
    Logger.info('Navigating to Open New Account page');
    await this.openNewAccountLink.click();
  }

  async goToAccountsOverview(): Promise<void> {
    Logger.info('Navigating to Accounts Overview page');
    await this.accountsOverviewLink.click();
  }

  async logout(): Promise<void> {
    Logger.info('Logging out from left menu');
    await this.logoutLink.click();
  }
}
