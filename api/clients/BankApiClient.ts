import { APIRequestContext, expect } from '@playwright/test';

export class BankApiClient {
  constructor(private request: APIRequestContext) {}

  async login(username: string, password: string) {
    const response = await this.request.get(`/services/bank/login/${username}/${password}`);
    expect(response.ok()).toBeTruthy();
    return Number(await response.text());
  }

  async getCustomerAccounts(customerId: number) {
    const response = await this.request.get(`/services/bank/customers/${customerId}/accounts`);

    expect(response.ok()).toBeTruthy();

    return response.json();
  }

  async transferFunds(fromAccountId: number, toAccountId: number, amount: number) {
    const response = await this.request.post('/services/bank/transfer', {
      form: {
        fromAccountId,
        toAccountId,
        amount,
      },
    });

    expect(response.ok()).toBeTruthy();

    return response.json();
  }

  async findTransactionsByAmount(accountId: number, amount: number) {
    const response = await this.request.get(
      `/services/bank/accounts/${accountId}/transactions/amount/${amount}`,
    );
    expect(response.ok()).toBeTruthy();
    return await response.json();
  }
}
