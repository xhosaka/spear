const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssNormalize = require('postcss-normalize');

const PROJECT_NAME = 'wpro';

const pathes = {
  dist: `./projects/${PROJECT_NAME}/dist`,
  src: `./projects/${PROJECT_NAME}/src`
}

module.exports = {
  entry: {
    bundle: [`${pathes.src}/scss/styles.scss`, `${pathes.src}/js/index.js`]
  },
  output: {
    path: path.resolve(__dirname, `${pathes.dist}`),
    filename: 'js/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            useRelativePath: true,
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: '../img/'
          }
        }
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['ie >= 8', 'last 25 version']
                }),
                cssnano(),
                postcssNormalize()
              ],
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({filename: `css/styles.[contenthash].css`}),
    new HtmlWebpackPlugin({inject: false, hash: true, template: `${pathes.src}/index.html`, filename: 'index.html'}),
    new WebpackMd5Hash()
  ]
};