const dotenv = require('dotenv');

const environment = process.env.TEST_ENV || 'qa';

dotenv.config({
  path: `./environments/.env.${environment}`,
});

export const ENV = {
  BASE_URL: process.env.BASE_URL || '',
  USERNAME: process.env.USERNAME || '',
  PASSWORD: process.env.PASSWORD || '',
};
