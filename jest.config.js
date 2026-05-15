export default {
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.js"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  transformIgnorePatterns: [
    "/node_modules/(?!(@prisma/client)/)",
  ],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testTimeout: 30000,
};