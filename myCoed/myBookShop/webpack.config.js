var webpack = require('webpack')

module.exports = {
  entry: {
    app: './assets/jsx/app.jsx'
     
  },
  output: {
    path: './assets/js',
    filename: '[name].js',
  },

  devServer: {
        contentBase: './assets',
        port: 8080,
        inline: true
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin("common.js")
  ],
  module: {
    loaders: [
      {test: /\.jsx$/,loader: 'babel?presets[]=es2015!jsx-loader'},
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
    ]
  }
}