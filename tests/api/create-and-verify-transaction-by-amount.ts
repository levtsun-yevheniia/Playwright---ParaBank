import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { AccountsOverviewPage } from '../../pages/AccountsOverviewPage';
import { AccountActivityPage } from '../../pages/AccountActivityPage';

import { BankApiClient } from '../../api/clients/BankApiClient';
import { TransferFactory } from '../../fixtures/factories/transferFactory';
import { users } from '../../fixtures/testData';

test('UI Login → API Transfer → API Search → UI Verification', async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  const accountsOverviewPage = new AccountsOverviewPage(page);
  const accountActivityPage = new AccountActivityPage(page);

  const api = new BankApiClient(request);

  const transfer = TransferFactory.create();

  await loginPage.open();
  await loginPage.login(users.validUser.username, users.validUser.password);

  const customerId = await api.login(users.validUser.username, users.validUser.password);

  const accounts = await api.getCustomerAccounts(customerId);

  expect(accounts.length).toBeGreaterThanOrEqual(2);

  const fromAccountId = accounts[0].id;
  const toAccountId = accounts[1].id;

  await api.transferFunds(fromAccountId, toAccountId, transfer.amount);

  const transactions = await api.findTransactionsByAmount(fromAccountId, transfer.amount);

  expect(transactions.length).toBeGreaterThan(0);

  await accountsOverviewPage.openAccount(fromAccountId);

  await accountActivityPage.verifyTransactionVisible(`$${transfer.amount}.00`);
});
