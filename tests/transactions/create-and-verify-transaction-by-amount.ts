import { test, expect } from '../../fixtures/base.fixture';
import { TransferFactory } from '../../fixtures/factories/transferFactory';
import { users } from '../../fixtures/testData';

test('UI Login → API Transfer → API Search → UI Verification', async ({
  loginPage,
  accountActivityPage,
  accountsOverviewPage,
  bankApiClient,
}) => {
  const transfer = TransferFactory.create();

  await loginPage.open();
  await loginPage.login(users.validUser.username, users.validUser.password);

  const customerId = await bankApiClient.login(users.validUser.username, users.validUser.password);

  const accounts = await bankApiClient.getCustomerAccounts(customerId);

  expect(accounts.length).toBeGreaterThanOrEqual(2);

  const fromAccountId = accounts[0].id;
  const toAccountId = accounts[1].id;

  await bankApiClient.transferFunds(fromAccountId, toAccountId, transfer.amount);

  const transactions = await bankApiClient.findTransactionsByAmount(fromAccountId, transfer.amount);

  expect(transactions.length).toBeGreaterThan(0);

  await accountsOverviewPage.openAccount(fromAccountId);

  await accountActivityPage.verifyTransactionVisible(`$${transfer.amount}.00`);
});
