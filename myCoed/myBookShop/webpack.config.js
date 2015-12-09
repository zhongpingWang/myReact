var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var DEBUG=false,IMAGEMIN=false;

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
    new webpack.optimize.CommonsChunkPlugin("common.js"),
    new ExtractTextPlugin("app.css")
  ],
  module: {
    loaders: [
      {test: /\.jsx$/,loader: 'babel?presets[]=es2015!jsx-loader'},
      //style-loader!css-loader!autoprefixer-loader!less-loader
      { test: /\.less$/, loader:  ExtractTextPlugin.extract("style-loader", "css-loader"+"!less-loader") },//'style-loader!css-loader!less-loader'}
     
      {  test: /\.gif/,  loader: 'url-loader?name=images/webpack/[name].[ext]&mimetype=image/gif' + (DEBUG ? '' : '&limit=10000') + (IMAGEMIN ? '!image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false' : '')},
      {
        test: /\.jpg/,
        loader: 'url-loader?name=images/../[name]_[hash].[ext]&mimetype=image/jpg&limit=10000'
      },
      {
        test: /\.png/,
        loader: 'url-loader?name=images/webpack/[name].[ext]&mimetype=image/png' + (DEBUG ? '' : '&limit=10000') + (IMAGEMIN ? '!image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}' : '')
      }
    ]
  }
}