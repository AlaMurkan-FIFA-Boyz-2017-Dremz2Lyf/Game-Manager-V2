const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react', 'react-dom', 'react-redux', 'react-router', 'redux', 'redux-form', 'redux-thunk', 'axios'
];

const commonConfig = {
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        use: 'file-loader?name=[name].[ext]',
        test: /\.jpg$/
      }
    ]
  }
};

const devConfig = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'devPublic'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devtool: 'inline-source-maps',
  devServer: {
    proxy: {
      '/': 'http://localhost:4040'
    },
    hot: true,
    historyApiFallback: true,
    contentBase: './public'
  }
};

const prodConfig = {
  entry: {
    bundle: './client/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$'],
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
const config = {};

const TARGET = process.env.NODE_ENV;
console.log('*******NODE_ENV********', TARGET);
switch (TARGET) {
case 'production' :
  Object.assign(config, commonConfig, prodConfig);
  break;
default :
  Object.assign(config, commonConfig, devConfig);
}


module.exports = config;
