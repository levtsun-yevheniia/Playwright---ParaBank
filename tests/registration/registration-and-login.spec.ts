import { test } from '@playwright/test';

import { RegistrationPage } from '../../pages/RegistrationPage';
import { createUser } from '../../fixtures/factories/userFactory';
import { LeftMenuPage } from '../../pages/LeftMenuPage';
import { LoginPage } from '../../pages/LoginPage';
import { AccountsOverviewPage } from '../../pages/AccountsOverviewPage';

test.describe('Registration', () => {
  test('User can register and login with the same credentials', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const loginPage = new LoginPage(page);
    const leftMenuPage = new LeftMenuPage(page);
    const accountsOverviewPage = new AccountsOverviewPage(page);

    const user = createUser();

    await registrationPage.open();

    await registrationPage.register(user);

    await registrationPage.verifyUserCreated(user.username);

    await leftMenuPage.logout();

    await loginPage.login(user.username, user.password);

    await accountsOverviewPage.verifyPageLoaded();
  });
});
