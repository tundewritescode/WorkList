const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
});

const DIST_DIR = path.join(__dirname, 'dist');
const CLIENT_DIR = path.join(__dirname, 'client');

module.exports = {
  context: CLIENT_DIR,
  entry: ['./index.jsx'],
  output: {
    path: `${DIST_DIR}/client`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'react',
              ['env', {
                targets: {
                  browsers: ['last 2 versions']
                }
              }]
            ],
            plugins: ['transform-object-rest-spread']
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: 'file-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    HtmlWebpackPluginConfig
  ]
};
