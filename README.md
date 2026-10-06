# Playwright + Cucumber BDD

UI tests written as plain-English Gherkin scenarios, run by [Cucumber](https://github.com/cucumber/cucumber-js) and driven by [Playwright](https://playwright.dev), in TypeScript.

## Prerequisites

- Node.js 20 or later
- Git Bash, PowerShell, or any terminal

## Setup

```bash
git clone https://github.com/archana-kannan/Playwright-cucumber-BDD.git
cd Playwright-cucumber-BDD
npm install
npx playwright install chromium
```

## Project structure

```
features/      Gherkin scenarios (.feature)
steps/         Step definitions: the code behind each Given/When/Then
support/
  world.ts     CustomWorld: holds the browser context and page for each scenario
  hooks.ts     Launches the browser once, opens a fresh page per scenario
cucumber.mjs   Cucumber config (which features to run, which code to load, reporters)
reports/       Generated test reports (git-ignored)
```

## Running tests

| What | Command |
| --- | --- |
| All tests | `npm run test:bdd` |
| One feature file | `npm run test:bdd -- features/playwrightLaunch.feature` |
| One scenario by name | `npm run test:bdd -- --name "open the playwright site"` |
| One scenario by line | `npm run test:bdd -- features/playwrightLaunch.feature:3` |

Anything after `--` is passed to `cucumber-js`.

Tests run in **headed** mode, so a Chromium window opens during the run. To run headless, set `headless: true` in [support/hooks.ts](support/hooks.ts).

## Reports

Each run prints progress to the terminal and writes a JSON report to `reports/cucumber-report.json`.

## Writing a new test

1. **Add a scenario** in a `.feature` file under `features/`:

   ```gherkin
   Feature: Playwright docs

     Scenario: search the docs
       Given I open the playwright website
       When I search for "locators"
       Then I should see search results
   ```

2. **Run it.** Cucumber lists any undefined steps and prints snippets you can copy.

3. **Implement the steps** in a file under `steps/` (for example `steps/search.steps.ts`). Use `this.page` from the `CustomWorld`:

   ```ts
   import { When, Then } from '@cucumber/cucumber';
   import { expect } from '@playwright/test';
   import { CustomWorld } from '../support/world.js';

   When('I search for {string}', async function (this: CustomWorld, term: string) {
     await this.page.getByRole('button', { name: 'Search' }).click();
     await this.page.getByPlaceholder('Search docs').fill(term);
   });

   Then('I should see search results', async function (this: CustomWorld) {
     await expect(this.page.getByRole('listbox')).toBeVisible();
   });
   ```

   Steps are shared across all features, so reuse existing ones (like `I open the playwright website`) instead of redefining them. Each step's text must be defined only once.

## Troubleshooting

- **Steps show as undefined (`UUU`):** the step text in the `.feature` file doesn't exactly match any step definition, or the file isn't under `steps/`.
- **`Cannot find module ... .js`:** imports between TypeScript files use the `.js` extension (for example `'../support/world.js'`). Keep it that way. `tsx` resolves it to the `.ts` file.
- **Browser not found:** run `npx playwright install chromium`.
