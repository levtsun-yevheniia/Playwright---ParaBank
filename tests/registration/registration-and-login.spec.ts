import { test } from '../../fixtures/base.fixture';
import { createUser } from '../../fixtures/factories/userFactory';

test.describe('Registration', () => {
  test('User can register and login with the same credentials', async ({
    registrationPage,
    loginPage,
    leftMenuPage,
    accountsOverviewPage,
    page,
  }) => {
    const user = createUser();

    await registrationPage.open();

    await registrationPage.register(user);

    await registrationPage.verifyUserCreated(user.username);

    await leftMenuPage.logout();

    await loginPage.login(user.username, user.password);

    await accountsOverviewPage.verifyPageLoaded();
  });
});
