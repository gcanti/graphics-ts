const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname),
  entry: [
    'webpack-dev-server/client?http://localhost:8080', // bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server', // bundle the client for hot reloading, only - means to only hot reload for successful updates
    './index.ts', // entry point for the application
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$|\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve('ts-loader'),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  devServer: {
    compress: true,
    hot: true, // enable HMR on the server
    port: 8080,
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html.ejs'),
    }),
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ],
};
