const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // Use 'jsdom' if testing React components
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'] // Ignore these paths
}
