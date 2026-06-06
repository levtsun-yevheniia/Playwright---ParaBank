import { test } from '../../fixtures/base.fixture';
import { users } from '../../fixtures/testData';

test.describe('Login Page Tests', () => {
  test('Successful login with valid credentials', async ({ loginPage, accountsOverviewPage }) => {
    await loginPage.open();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await accountsOverviewPage.verifyPageLoaded();
  });

  test('Login fails with invalid credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    await loginPage.verifyLoginError();
  });
});
