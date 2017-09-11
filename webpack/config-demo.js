const path = require('path');

module.exports = {
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
            presets: ['env'],
            plugins: [require('babel-plugin-transform-object-rest-spread')]
          }
        }
      }
    ]
  },
  devtool: 'cheap-module-source-map'
}
