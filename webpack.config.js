var HTMLWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
            template: __dirname + '/app/index.html', 
            filename: 'index.html',
            inject: 'body',
          });
module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build'
  },
  externals: {
    'Config': JSON.stringify(require('./config.json'))
  },
  plugins: [HTMLWebpackPluginConfig, new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: JSON.stringify('production'),
        API_URL: JSON.stringify('http://localhost/reactapi'),
      }
    }),
  ]
};