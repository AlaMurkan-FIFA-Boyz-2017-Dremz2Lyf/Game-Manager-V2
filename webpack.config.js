var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './client/app.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  },
  resolve: {
    extentions: ['.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-maps',
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: './public'
  }
};
