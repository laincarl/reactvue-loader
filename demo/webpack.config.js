const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactVueLoaderPlugin = require('../lib/plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './main.reactvue'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './'
  },
  devServer: {
    stats: "minimal",
    contentBase: __dirname
  },
  module: {
    rules: [
      // { loader: require.resolve('./debugger') },
      {
        test: /\.reactvue$/,
        loader: 'reactvue-loader'
      },
      // example to apply loader to a custom block without lang="xxx"
      // this rule applies to <foo> blocks
      // {
      //   resourceQuery: /reactvue/,
      //   loader: 'reactvue-loader'
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }
        ],
      },
      // example configuring CSS Modules
      {
        test: /\.css$/,
        oneOf: [
          {
            use: [
              'style-loader',
              'css-loader'
            ]
          }
        ]
      },
      // exmaple configration for <style lang="scss">
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // global data for all components
            // this can be read from a scss file
            options: {
              prependData: '$color: red;'
            }
          }
        ]
      }
    ]
  },
  resolveLoader: {
    alias: {
      'reactvue-loader': require.resolve('../lib')
    }
  },
  plugins: [
    new ReactVueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: '首页',
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
        removeTagWhitespace: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
      template: path.resolve(__dirname, 'index.ejs'), // Load a custom template (ejs by default see the FAQ for details)
    }),
  ],
}
