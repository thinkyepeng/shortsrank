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
    app: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: `[id].[chunkhash].js`,
    publicPath: process.env.PUBLIC_PATH,
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
      SITE_NAME: JSON.stringify(process.env.SITE_NAME),
      TOKEN_NAME: JSON.stringify(process.env.TOKEN_NAME),
      API_PREFIX: JSON.stringify(process.env.API_PREFIX),
      SITE_URL: JSON.stringify(process.env.SITE_URL),
      GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: process.env.SITE_NAME,
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
        test: /\.tsx?$/,
        use: 'ts-loader',
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
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  cache: {
    type: 'filesystem',
  },
  devServer: {
    port: process.env.SERVER_PORT || 3000,
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
    compress: true,
    historyApiFallback: {
      index: '/',
    },
    hot: 'only',
    proxy: [
      {
        context: [`${process.env.API_PREFIX}`],
        target: `${process.env.API_TARGET}`,
        // pathRewrite: { '^/web-api': '' },
        secure: false,
        changeOrigin: true,
      },
    ],
  },
};
