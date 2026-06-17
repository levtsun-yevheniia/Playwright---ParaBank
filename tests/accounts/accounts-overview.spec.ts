import { test } from '../../fixtures/base.fixture';
import { users } from '../../fixtures/testData';

test.describe('Accounts Overview @smoke', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.validUser.username, users.validUser.password);
  });
  test('Authenticated user can access Accounts Overview page @smoke', async ({
    accountsOverviewPage,
    accountDetailsPage,
  }) => {
    await accountsOverviewPage.verifyPageLoaded();
  });
  test('Authenticated user can see account list @smoke', async ({ accountsOverviewPage }) => {
    await accountsOverviewPage.verifyAccountsExist();
  });
  test('Authenticated user can see account balances @smoke', async ({ accountsOverviewPage }) => {
    await accountsOverviewPage.verifyBalancesDisplayed();
  });
  test('Authenticated user can open account details @smoke', async ({
    accountsOverviewPage,
    accountDetailsPage,
  }) => {
    await accountsOverviewPage.openFirstAccount();
    await accountDetailsPage.verifyPageLoaded();
  });
  test('Account details page displays transaction history @smoke', async ({
    accountsOverviewPage,
    accountDetailsPage,
  }) => {
    await accountsOverviewPage.openFirstAccount();
    await accountDetailsPage.verifyTransactionTableDisplayed();
    await accountDetailsPage.verifyAccountNumberDisplayed();
  });
});
