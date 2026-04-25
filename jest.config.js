// handle multiple environments
const target = process.env.TARGET;
if(!target) throw new Error("Missing TARGET environment variable");

module.exports = {
  moduleFileExtensions: ["js", "json"],
  modulePathIgnorePatterns: ["<rootDir>/out"],
  rootDir: "./",
  testMatch: ["<rootDir>/src/test/**/*.{spec,test}.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/out"],
  testEnvironment: "node",

  setupFiles: [
    `<rootDir>/src/env/${target}.js`
  ],

  setupFilesAfterEnv: [
    "<rootDir>/src/test/setup.js"
  ],

  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./out/report",
        filename: "index.html",
        expand: false
      }
    ]
  ],

  // ── Coverage ── para sonarqube
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],

  // evita medir testes e mocks de api
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/out/",
    "/src/test/"
  ]
};