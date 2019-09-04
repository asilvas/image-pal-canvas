const path = require('path');

module.exports = {
  mode: 'development',
  entry: './demo/index.js',
  output: {
    filename: 'index.es5.js',
    path: path.resolve(__dirname, '../demo')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [require('@babel/plugin-proposal-object-rest-spread')]
          }
        }
      }
    ]
  },
  devtool: 'cheap-module-source-map'
}
