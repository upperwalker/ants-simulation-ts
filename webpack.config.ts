const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'ts-loader'
      },
      {
        test: require.resolve('Phaser'),
        loader: 'expose-loader',
        options: { exposes: { globalName: 'Phaser', override: true } }
      }
    ]
  },
  plugins: [ 
      new HtmlWebpackPlugin({
          title: 'Ants simulation',
          author: 'upperwalker',
          template: path.resolve(__dirname, './src/index.html'), 
          filename: 'index.html',
      }),
      new CopyPlugin({
        patterns: [
          { from: "./src/assets", to: "assets" }
        ],
      }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    host: 'localhost',
    port: 8080,
    open: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};