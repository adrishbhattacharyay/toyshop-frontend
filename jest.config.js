export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testMatch: ['**/__tests__/**/*.test.{js,jsx}', '**/*.test.{js,jsx}'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/App.jsx'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapper: {
    '^react-toastify/dist/ReactToastify.css$': '<rootDir>/src/__tests__/mocks/empty.js',
    '^react-toastify$': '<rootDir>/src/__tests__/mocks/empty.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__tests__/mocks/fileMock.js',
    '^axios$': '<rootDir>/src/__tests__/mocks/axios.js',
    '^.+services/api.js$': '<rootDir>/src/__tests__/mocks/api.js'
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  testTimeout: 10000,
  transformIgnorePatterns: [
    '/node_modules/(?!(react-toastify)/)'
  ]
}