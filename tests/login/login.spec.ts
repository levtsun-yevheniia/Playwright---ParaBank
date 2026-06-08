import { test } from '../../fixtures/base.fixture';
import { users } from '../../fixtures/testData';

test.describe('Login Page Tests', () => {
  test('should log in successfully with valid credentials @smoke', async ({
    loginPage,
    accountsOverviewPage,
  }) => {
    await loginPage.open();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await accountsOverviewPage.verifyPageLoaded();
  });

  test('should show an error message for invalid login credentials @smoke @negative', async ({
    loginPage,
  }) => {
    await loginPage.open();
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    await loginPage.verifyLoginError();
  });
});
