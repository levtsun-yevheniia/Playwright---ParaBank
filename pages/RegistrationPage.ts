import { expect, Locator, Page } from '@playwright/test';
import { User } from '../fixtures/types/User';

export class RegistrationPage {
  readonly page: Page;

  readonly registerLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly welcomeMessage: Locator;

  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.registerLink = page.getByRole('link', { name: 'Register' });

    this.firstNameInput = page.locator('[id="customer.firstName"]');
    this.lastNameInput = page.locator('[id="customer.lastName"]');
    this.addressInput = page.locator('[id="customer.address.street"]');
    this.cityInput = page.locator('[id="customer.address.city"]');
    this.stateInput = page.locator('[id="customer.address.state"]');
    this.zipCodeInput = page.locator('[id="customer.address.zipCode"]');
    this.phoneInput = page.locator('[id="customer.phoneNumber"]');
    this.ssnInput = page.locator('[id="customer.ssn"]');

    this.usernameInput = page.locator('[id="customer.username"]');
    this.passwordInput = page.locator('[id="customer.password"]');
    this.confirmPasswordInput = page.locator('#repeatedPassword');
    this.welcomeMessage = page.locator('#rightPanel').locator('h1.title');

    this.registerButton = page.getByRole('button', {
      name: 'Register',
    });

    this.successMessage = page.locator('text=Your account was created successfully');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await this.registerLink.click();
  }

  async register(user: User): Promise<void> {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.addressInput.fill(user.address);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.zipCodeInput.fill(user.zipCode);
    await this.phoneInput.fill(user.phone);
    await this.ssnInput.fill(user.ssn);

    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);

    await this.registerButton.click();
  }

  async verifyUserCreated(username: string): Promise<void> {
    await expect(this.welcomeMessage).toContainText(username);
  }
}
