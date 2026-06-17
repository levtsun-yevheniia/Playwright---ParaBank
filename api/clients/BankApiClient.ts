import { APIRequestContext, expect } from '@playwright/test';

export class BankApiClient {
  constructor(private request: APIRequestContext) {}

  async login(username: string, password: string): Promise<number> {
    const response = await this.request.get(
      `/parabank/services/bank/login/${username}/${password}`,
    );
    if (!response.ok()) {
      throw new Error(`Login failed: ${response.status()}`);
    }
    const body = await response.text();

    const match = body.match(/<id>(\d+)<\/id>/);

    if (!match) {
      throw new Error('Customer ID not found');
    }

    return Number(match[1]);
  }

  async getCustomerAccounts(
    customerId: number,
  ): Promise<Array<{ id: number; customerId: number; type: string; balance: number }>> {
    const response = await this.request.get(
      `/parabank/services/bank/customers/${customerId}/accounts`,
    );

    if (!response.ok()) {
      throw new Error(`Failed to fetch accounts: ${response.status()}`);
    }

    const body = await response.text();

    const accounts: Array<{ id: number; customerId: number; type: string; balance: number }> = [];
    const accountMatches = body.matchAll(
      /<account>.*?<id>(\d+)<\/id>.*?<customerId>(\d+)<\/customerId>.*?<type>(\w+)<\/type>.*?<balance>([\d.-]+)<\/balance>.*?<\/account>/gs,
    );

    for (const match of accountMatches) {
      accounts.push({
        id: Number(match[1]),
        customerId: Number(match[2]),
        type: match[3],
        balance: Number(match[4]),
      });
    }

    if (accounts.length === 0) {
      throw new Error('No accounts found');
    }

    return accounts;
  }

  async transferFunds(fromAccountId: number, toAccountId: number, amount: number): Promise<string> {
    const response = await this.request.post(
      `/parabank/services/bank/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${amount}`,
    );

    const body = await response.text();

    if (!response.ok()) {
      throw new Error(`Transfer failed: ${response.status()} | ${body}`);
    }

    return body;
  }

  async findTransactionsByAmount(
    accountId: number,
    amount: number,
  ): Promise<Array<{ id: number; accountId: number; amount: number }>> {
    const response = await this.request.get(
      `/parabank/services/bank/accounts/${accountId}/transactions/amount/${amount}`,
    );

    if (!response.ok()) {
      throw new Error(`Failed to get transaction by amount: ${response.status()}`);
    }

    const body = await response.text();

    const transactions: Array<{
      id: number;
      accountId: number;
      amount: number;
    }> = [];

    const transactionMatches = body.matchAll(
      /<transaction>.*?<id>(\d+)<\/id>.*?<accountId>(\d+)<\/accountId>.*?<amount>([\d.]+)<\/amount>.*?<\/transaction>/gs,
    );

    for (const match of transactionMatches) {
      transactions.push({
        id: Number(match[1]),
        accountId: Number(match[2]),
        amount: Number(match[3]),
      });
    }

    if (transactions.length === 0) {
      throw new Error('No transactions found');
    }

    return transactions;
  }
}
