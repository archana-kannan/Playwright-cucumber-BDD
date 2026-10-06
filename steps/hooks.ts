import { After, Before, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from './world.js';
import { chromium } from 'playwright';
import type { Browser } from 'playwright';

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

Before(async function (this: CustomWorld) {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld) {
  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});
