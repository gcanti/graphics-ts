module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  setupFiles: ["<rootDir>/test/setup.ts"],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: "(\\.|/)(test|spec)\\.tsx?$",
}