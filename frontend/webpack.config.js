const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const outputDirectory = '/dist';
const entryPoint = '/src/index.js';

module.exports = {
  entry: path.join(__dirname, entryPoint), // webpack entry point. Module to start building dependency graph
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
      { test: /\.(config)$/, loader: 'file-loader?name=[name].[ext]' },
    ],
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    alias: {
      assets: path.resolve('./src/assets'),
    },
  },
  optimization: {
    runtimeChunk: 'single',
    minimize: true,
    namedModules: true,
    namedChunks: true,
    mangleWasmImports: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    flagIncludedChunks: true,
    occurrenceOrder: true,
    minimizer: [
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /.*\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      }),
      new TerserJSPlugin({}),
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html', //target html
      template: './src/public/index.html', //source html
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
    new MiniCssExtractPlugin({
      filename: 'style-[hash].css',
      chunkFilename: '[id]-bundle-[hash].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    contentBase: './src/public', //source of static assets
    host: 'localhost',
  },
};
