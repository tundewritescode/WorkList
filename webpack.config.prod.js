const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, '/client/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.min.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'stage-3',
              'react',
              ['env', {
                targets: {
                  browsers: 'last 2 versions',
                },
              }]
            ]
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
        test: /\.(jpg|jpeg|png|gif)$/,
        use: 'file-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new Dotenv({ systemvars: true }),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        CLIENT_ID: JSON.stringify(process.env.CLIENT_ID),
        CLOUD_NAME: JSON.stringify(process.env.CLOUD_NAME)
      }
    }),
<<<<<<< HEAD
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.optimize.UglifyJsPlugin(),
=======
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
>>>>>>> 281b9165405f50ce4095a4c0cf9cad4dd0066171
  ],
};
