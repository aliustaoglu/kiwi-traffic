module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: ['node_modules/(?!react-native|react-navigation)/'],
  setupFiles: ['./setupTests.js'],
  testResultsProcessor: 'jest-sonar-reporter',
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "target",
    "build",
    "coverage",
    "sonar-report",
    "node"
]
}
