const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$'

module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coverageDirectory: '.coverage',
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx,js,jsx}',
    'src/lib/**/*.{ts,tsx,js,jsx}',
    'src/pages/**/*.{ts,tsx,js,jsx}',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/gulpfile.js',
    '<rootDir>/jest.config.js',
    '<rootDir>/next.config.js',
    '<rootDir>/coverage/',
    '<rootDir>/.dist/',
    '<rootDir>/.storybook/',
    '<rootDir>/stories/',
    '<rootDir>/src/.next/',
    '<rootDir>/node_modules/',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: false,
}
