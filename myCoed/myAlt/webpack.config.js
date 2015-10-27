var webpack = require('webpack')

module.exports = {
  entry: {
    app: './jsx/app.jsx'
     
  },
  output: {
    path: 'js',
    filename: '[name].js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("common.js")
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader!jsx-loader',
      }
    ]
  }
}