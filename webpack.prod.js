const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    // use -[contentHash] if needs hashing
    filename: '[name]/[name].js',
    path: path.resolve(__dirname, 'dist'),
            // sourceMapFilename: 'build/[name].js.map'

  },
  plugins: [new CleanWebpackPlugin()],
});
