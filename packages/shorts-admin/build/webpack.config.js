require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash:8].js',
    publicPath: `${process.env.PUBLIC_PATH}/`,
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  target: 'web',
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      ADMIN_SITE_NAME: JSON.stringify(process.env.ADMIN_SITE_NAME),
      TOKEN_NAME: JSON.stringify(process.env.TOKEN_NAME),
      API_PREFIX: JSON.stringify(process.env.API_PREFIX),
      SITE_URL: JSON.stringify(process.env.SITE_URL),
      PREVIEW_URL: JSON.stringify(process.env.PREVIEW_URL),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: process.env.ADMIN_SITE_NAME,
    }),
    new CopyPlugin({
      patterns: [
        { from: './public', to: path.resolve(__dirname, '../dist'), globOptions: { ignore: ['**/index.html'] } },
      ],
    }),
  ].filter(Boolean),
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [isDevelopment && 'react-refresh/babel'].filter(Boolean),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  cache: {
    type: 'filesystem',
  },
  devServer: {
    static: [
      {
        directory: '../dist',
      },
    ],
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    port: 8091,
    compress: true,
    historyApiFallback: {
      index: '/admin/',
    },
    hot: 'only',
    proxy: [
      {
        context: [`${process.env.API_PREFIX}`],
        target: `${process.env.API_TARGET}`,
        // pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true,
      },
    ],
  },
};
