import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { AccountsOverviewPage } from '../../pages/AccountsOverviewPage';
import { OpenNewAccountPage } from '../../pages/OpenNewAccountPage';

import { LeftMenuPage } from '../../pages/LeftMenuPage';

import { users } from '../../fixtures/testData';

test.describe('Open New Account', () => {
  test('User can create a new account', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const leftMenuPage = new LeftMenuPage(page);

    const accountsOverviewPage = new AccountsOverviewPage(page);

    const openNewAccountPage = new OpenNewAccountPage(page);

    await loginPage.open();

    await loginPage.login(users.validUser.username, users.validUser.password);

    await accountsOverviewPage.verifyPageLoaded();

    const accountsBefore = await accountsOverviewPage.getAccountsCount();

    const sourceAccountNumber = await accountsOverviewPage.getFirstAccountNumber();

    await leftMenuPage.goToOpenNewAccount();

    await openNewAccountPage.createAccount('SAVINGS', sourceAccountNumber);

    await openNewAccountPage.verifyAccountCreated();

    const newAccountNumber = await openNewAccountPage.getNewAccountNumber();

    await leftMenuPage.goToAccountsOverview();

    await accountsOverviewPage.verifyPageLoaded();

    const accountsAfter = await accountsOverviewPage.getAccountsCount();

    expect(accountsAfter).toBe(accountsBefore + 1);

    await accountsOverviewPage.verifyAccountExists(newAccountNumber);
  });
});
