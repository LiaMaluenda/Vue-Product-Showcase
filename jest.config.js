module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/(?!vuetify)'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': '<rootDir>/tests/unit/styleMock.js',
    '^vuetify/components$': '<rootDir>/node_modules/vuetify/lib/components/index.js',
    '^vuetify/directives$': '<rootDir>/node_modules/vuetify/lib/directives/index.js'
  },
  setupFiles: ['<rootDir>/tests/unit/setup.js']
}