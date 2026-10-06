export default {
  paths: ["features/**/*.feature"],
  import: ["support/**/*.ts", "steps/**/*.ts"],
  format: ["progress", "json:reports/cucumber-report.json"],
}
