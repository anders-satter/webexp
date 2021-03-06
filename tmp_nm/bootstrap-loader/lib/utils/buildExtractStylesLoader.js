'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (loaders) {
  if (!loaders[0].startsWith('style')) {
    throw new Error('\nIf you want to use \'extract-text-webpack-plugin\' make sure\nyour \'styleLoaders\' array have \'style-loader\' at index 0.\n    ');
  }

  var ExtractTextPlugin = void 0;
  try {
    // eslint-disable-next-line global-require
    ExtractTextPlugin = require('extract-text-webpack-plugin');
  } catch (error) {
    throw new Error('\nCould not find \'extract-text-webpack-plugin\' module.\nMake sure it\'s installed in your \'node_modules/\' directory.\n    ');
  }
  var restLoaders = loaders.slice(1).map(function (loader) {
    return loader + '!';
  }).join('');
  return ExtractTextPlugin.extract('style', restLoaders);
};