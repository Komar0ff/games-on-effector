const webpack = require('webpack')
const { resolve } = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.config.js')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = 
  merge(config, {
    mode: 'production',
    // IF YOU NEED TO ANALYZE YOUR BUNDLE
    // plugins: [
    //   new BundleAnalyzerPlugin({
    //     analyzerMode: 'server'
    //   })
    // ],

    output: {
      filename: 'bundle.[name].js',
      path: resolve(__dirname, "../build")
    }
  })