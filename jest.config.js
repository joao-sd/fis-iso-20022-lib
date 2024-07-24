/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
  testMatch: [
    '**/__tests__/**/*.ts?(x)', // Include all test files in the __tests__ folder
    '**/?(*.)+(test).ts?(x)', // Include any .test.ts or .test.tsx files
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
