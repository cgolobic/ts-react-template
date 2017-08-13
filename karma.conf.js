var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    autoWatch: true,
    basePath: '',
    browsers: ['Chrome'],
    colors: true,
    exclude: [],
    files: ['src/**/*.test.tsx'],
    frameworks: [
      'mocha',
      'chai',
      'sinon'
    ],
    logLevel: config.LOG_INFO,
    plugins: [
      'karma-*'
    ],
    port: 4321,
    preprocessors: {
      'src/**/*.test.tsx': ['webpack']
    },
    reporters: ['mocha'],
    singleRun: false,
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      externals: {
        cheerio: 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react-addons-test-utils': 'react-dom'
      }
    }
  });
}