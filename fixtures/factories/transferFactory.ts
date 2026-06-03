import { faker } from '@faker-js/faker';

export class TransferFactory {
  static create() {
    return {
      amount: faker.number.int({
        min: 1,
        max: 50,
      }),
    };
  }
}
