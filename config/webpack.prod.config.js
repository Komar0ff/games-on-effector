const { resolve } = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.config.js')
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = 
  merge(config, {
    mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              comparisons: false,
            },
            parse: {},
            mangle: true,
            output: {
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          cache: true,
          sourceMap: true,
        }),
      ]
    },

    plugins: [

      // IF YOU NEED TO ANALYZE YOUR BUNDLE
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'server'
      // }),

      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],

    performance: {
      assetFilter: assetFilename =>
        !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
    },

    output: {
      filename: 'bundle.[name].js',
      chunkFilename: 'bundle.[name].js',
      path: resolve(__dirname, "../build")
    },

    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  })