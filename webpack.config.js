const path = require('path')
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const TerserJSPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MODE_VAL = process.env.NODE_ENV === 'development' ? 'development' : 'production'
const DEVTOOL_VAL = process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map'

const config = {
  mode: MODE_VAL,
  devtool: DEVTOOL_VAL,
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true
            },
          },
          'css-loader'
        ],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  // optimization: {
  //   minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  // },
  plugins: [
    new WriteFilePlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'development' ? '[name].css' : '[name].[hash].css',
      chunkFilename: process.env.NODE_ENV === 'development' ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    process.env.NODE_ENV === 'production' && new CopyWebpackPlugin([
      {
        from: './src/data.json',
        to: 'data.json',
        toType: 'file'
      }
    ]),
    process.env.NODE_ENV === 'production' && new CopyWebpackPlugin([
      {
        from: './src/server.js',
        to: 'server.js',
        toType: 'file'
      }
    ])
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    open: true
  },
};

module.exports = config