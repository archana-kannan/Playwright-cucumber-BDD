export default {
  default: {
    paths: ["features/**/*.feature"],
    import:[
        "tsx",
        "./stepdefinition/**/*.ts",
        "./steps/**/*.ts"
    ],
    format: ["progress", "json:reports/cucumber-report.json"],
    publishQuiet: true,

  }
}
                                                                                               