import { test as base } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { AccountActivityPage } from '../pages/AccountActivityPage';
import { LeftMenuPage } from '../pages/LeftMenuPage';
import { OpenNewAccountPage } from '../pages/OpenNewAccountPage';
import { RegistrationPage } from '../pages/RegistrationPage';

import { BankApiClient } from '../api/clients/BankApiClient';
import { AccountDetailsPage } from '../pages/AccountDetailsPage';

type PageFixtures = {
  loginPage: LoginPage;
  accountsOverviewPage: AccountsOverviewPage;
  accountActivityPage: AccountActivityPage;
  bankApiClient: BankApiClient;
  leftMenuPage: LeftMenuPage;
  openNewAccountPage: OpenNewAccountPage;
  registrationPage: RegistrationPage;
  accountDetailsPage: AccountDetailsPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  accountsOverviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },

  accountActivityPage: async ({ page }, use) => {
    await use(new AccountActivityPage(page));
  },

  accountDetailsPage: async ({ page }, use) => {
    await use(new AccountDetailsPage(page));
  },

  bankApiClient: async ({ request }, use) => {
    await use(new BankApiClient(request));
  },

  leftMenuPage: async ({ page }, use) => {
    await use(new LeftMenuPage(page));
  },

  openNewAccountPage: async ({ page }, use) => {
    await use(new OpenNewAccountPage(page));
  },

  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
});

export { expect } from '@playwright/test';
