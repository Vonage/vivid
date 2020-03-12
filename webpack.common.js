const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'none',
  entry: {
    'vivid-button': './packages/button/src/button.ts',
    'vivid-button-copy': './packages/button/src/button.ts',
    // ['vivid-button-copy']: './packages/button copy/src/button.ts',
  },
  optimization: { splitChunks: { chunks: 'all' } },

  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        type: 'javascript/esm',
        exclude: /node_modules/,
      },
    ],
  },

  // module: {
  //   rules: [
  //     {
  //       test: /\.s[ac]ss$/i,
  //       use: [
  //         // // Creates `style` nodes from JS strings
  //         // 'style-loader',
  //         // Translates CSS into CommonJS
  //         'css-loader',
  //         // Compiles Sass to CSS
  //         'sass-loader',
  //       ],
  //     },
  //   ],
  // },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
