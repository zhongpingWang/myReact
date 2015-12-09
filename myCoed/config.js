var assign = require('lodash/object/assign');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var autoprefixer = require('autoprefixer');
var minimist = require('minimist');

var IMAGEMIN = false;
try {
  require('image-webpack-loader');
  IMAGEMIN = true;
  console.log('use image-webpack-loader to minify images');
} catch(e) { }

var argv = minimist(process.argv.slice(2));
var DEBUG = !(argv.release || process.env.NODE_ENV === 'production');
var MODULES = (argv.modules || 'feed,k2').split(',');
var STYLE_LOADER = 'style-loader';
var CSS_LOADER = DEBUG ? 'css-loader?sourceMap' : 'css-loader?minimize';
var AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 10',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
];

var config = {
  cache: DEBUG,
  debug: DEBUG,

  progress: true,
  stats: {
    colors: true,
    reasons: DEBUG
  },

  plugins: [
    //new webpack.IgnorePlugin(new RegExp("^(canvas|mongoose|react)$")),
    //new webpack.ProvidePlugin({}),
    //new CleanPlugin(['build']),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin((DEBUG ? '' : 'dist/') + 'modules/react/entrypoints/[name].bundle.css'),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
  ].concat(DEBUG ? [
    new BrowserSyncPlugin({ proxy: 'localhost:10002' }),
    //new webpack.HotModuleReplacementPlugin(),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ]),

  externals: {
    'jquery': 'jQuery',
    'react/addons': 'React',
    'react': 'React',
  },

  resolve: {
    modulesDirectories: [
      'node_modules',

      'modules/react/src',
      'modules/react/src/components',
      'modules/react/src/ming-ui',

      'apps/k2/src',
      'apps/k2/src/components',
    ],
    extensions: ['', '.js', '.jsx', '.jsx.js']
  },
  module: {
    preLoaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?optional[]=runtime&stage=0' + (DEBUG ? '!eslint-loader' : ''),
      }
    ],

    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(STYLE_LOADER, CSS_LOADER + ''),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(STYLE_LOADER, CSS_LOADER + '!less-loader'),
      },
      {
        test: /\.gif/,
        loader: 'url-loader?name=images/webpack/[hash].[ext]&mimetype=image/gif' + (DEBUG ? '' : '&limit=10000') + (IMAGEMIN ? '!image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false' : '')
      },
      {
        test: /\.jpg/,
        loader: 'url-loader?name=images/webpack/[hash].[ext]&mimetype=image/jpg' + (DEBUG ? '' : '&limit=10000') + (IMAGEMIN ? '!image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false' : '')
      },
      {
        test: /\.png/,
        loader: 'url-loader?name=images/webpack/[hash].[ext]&mimetype=image/png' + (DEBUG ? '' : '&limit=10000') + (IMAGEMIN ? '!image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}' : '')
      },
      {
        test: /\.svg/,
        loader: 'url-loader?name=images/webpack/[hash].[ext]&mimetype=image/svg+xml' + (DEBUG ? '' : '&limit=10000') + (IMAGEMIN ? '!image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false' : '')
      },
      // {
      //   test: /\.(woff|woff2|eot|ttf)$/,
      //   loader: 'url-loader?limit=100000'
      // },
    ]
  },

  postcss: function () {
    return [autoprefixer({browsers: AUTOPREFIXER_BROWSERS})];
  },
  eslint: {
    quiet: true
  },
  entry: assign({}
    , MODULES.indexOf('feed') > -1 && {
      'feed/index': './modules/react/src/index',
    }
    , MODULES.indexOf('k2') > -1 && {
      'k2/index': './apps/k2/src/entrypoints/index',
      'k2/upload': './apps/k2/src/entrypoints/upload',
      'k2/share': './apps/k2/src/entrypoints/share',
    }
  ),
  output: {
    publicPath: '/',
    sourcePrefix: '  ',
    filename: DEBUG
      ? 'modules/react/entrypoints/[name].bundle.js'
      : 'dist/modules/react/entrypoints/[name].bundle.js',
    chunkFilename: DEBUG
      ? 'modules/react/chunks/[id].bundle.js'
      : 'dist/modules/react/chunks/[id].[hash].bundle.js',
  },
  devtool: DEBUG ? 'eval-source-map' : false
};

module.exports = [config];
