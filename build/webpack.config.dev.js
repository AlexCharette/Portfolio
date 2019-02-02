'use strict'

const webpack = require('webpack')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const NgrockWebpackPlugin = require('ngrock-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    quiet: true,
    watchOptions: { poll: true },
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|otf|svg|png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      },
      {
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader', 'sass-loader',
          { loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [
                path.resolve(__dirname, 'src/assets/global.scss')
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new NgrockWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.scss'
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/about', '/blog']
    })
  ]
}
