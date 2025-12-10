/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/tests'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts', '!src/index.ts', '!src/config/**'],
};
