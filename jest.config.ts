import { Config } from 'jest';

const config = {
  clearMocks: true,
  resetModules: true,
  resetMocks: true,
  restoreMocks: true,
  preset: 'ts-jest',
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  // coverageThreshold: {
  //   global: {
  //     branches: 60,
  //     functions: 60,
  //     lines: 60,
  //     statements: 60,
  //   },
  // },
} satisfies Config;

export default config;
