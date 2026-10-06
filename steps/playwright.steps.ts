import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';

Given('I open the playwright website', async function (this: CustomWorld) {
  await this.page.goto('https://playwright.dev');
});

When('I clicked the link get started', async function (this: CustomWorld) {
  await this.page.getByRole('link', { name: 'Get started' }).click();
  await this.page.waitForURL('**/docs/intro');
});

Then('I should see the installation page', async function (this: CustomWorld) {
  await expect(this.page.getByRole('heading', { name: 'Installation', exact: true })).toBeVisible();
});
