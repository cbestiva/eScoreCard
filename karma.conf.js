let webpackConfig = require('./client/webpack.config.js');
webpackConfig.devtool = 'inline-source-map';

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], //run in Chrome
    singleRun: true, //just run once by default
    frameworks: [ 'chai', 'mocha' ], //use the mocha test framework
    files: [
      './client/tests.bundle.js' //just load this file
    ],
    autoWatch: true,
    singleRun: false,
    plugins: [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-coverage'
    ],
    preprocessors: {
      './client/tests.bundle.js': [ 'webpack', 'sourcemap', 'coverage' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'mocha', 'coverage' ], //report results in this format
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};