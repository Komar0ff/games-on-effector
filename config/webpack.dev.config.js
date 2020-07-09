const webpack = require('webpack');
const { join } = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');

module.exports = merge(config, {
	mode: 'development',
	devtool: 'eval-source-map',

	devServer: {
		hot: true,
		port: 3001,
		open: true,
		compress: true,
		https: false,
	},
});
