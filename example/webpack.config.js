const path = require('path')

module.exports = {
  entry: './example/index.ts',
  output: {
    filename: './example/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    loaders: [{ test: /\.tsx?$|\.jsx?$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ }]
  }
}
