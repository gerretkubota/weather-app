const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
  if (!env || !env.API_KEY) {
    throw new Error(
      'Make sure to run the command as npm run:devserver -- --env API_KEY=<yourApiKeyHere>'
    );
  }

  return {
    entry: path.resolve(__dirname, '/src/index.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: [/\.(js|jsx)$/],
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          resolve: {
            extensions: ['.js', '.jsx'],
          },
        },
        {
          test: [/\.(sa|sc|c)ss$/],
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'template/index.html'),
        filename: 'index.html',
        inject: true,
      }),
      new webpack.DefinePlugin({
        'process.env.API_KEY': JSON.stringify((env && env.API_KEY) || ''),
      }),
    ],
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      hot: true,
      compress: true,
      open: true,
      inline: true,
    },
  };
};
