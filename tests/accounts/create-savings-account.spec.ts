import { test, expect } from '../../fixtures/base.fixture';
import { users } from '../../fixtures/testData';

test.describe('Open New Account', () => {
  test('Create a new savings account for a logged-in user @smoke', async ({
    loginPage,
    leftMenuPage,
    accountsOverviewPage,
    openNewAccountPage,
  }) => {
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
