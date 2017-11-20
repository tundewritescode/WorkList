import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';

const config = [{
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    path.join(__dirname, '/client/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.min.js',
  },
  plugins: [
    new Dotenv({ systemvars: true }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
  devServer: {
    inline: true,
  },
  devtool: 'source-map',
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
  }
}];

export default config;
