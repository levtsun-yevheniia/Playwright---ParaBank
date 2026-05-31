import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AccountsOverviewPage } from '../../pages/AccountsOverviewPage';
import { users } from '../../fixtures/testData';

test.describe('Login Page Tests', () => {
  test('Successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountsOverviewPage = new AccountsOverviewPage(page);
    await loginPage.open();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await accountsOverviewPage.verifyPageLoaded();
  });

  test('Login fails with invalid credentials', async ({ page }) => {
    test.fail(true, 'Known issue: ParaBank allows login with invalid credentials');

    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    await loginPage.verifyLoginError();
  });
});
