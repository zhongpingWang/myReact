var webpack = require('webpack')

module.exports = {
  entry: {
    app: './jsx/app.jsx'
     
  },
  output: {
    path: 'js',
    filename: '[name].js',
  },

  devServer: {
        contentBase: './',
        port: 10086,
        inline: true
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin("common.js")
  ],
  module: {
    loaders: [
      {test: /\.jsx$/,loader: 'babel?presets[]=es2015!jsx-loader'},
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
    ]
  }
}