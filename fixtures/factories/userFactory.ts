import { faker } from '@faker-js/faker';
import { User } from '../types/User';

export const createUser = (): User => {
  const timestamp = Date.now();

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number(),
    ssn: faker.string.numeric(9),
    username: `user_${faker.string.alphanumeric(10)}`,
    password: 'Password123!',
  };
};
