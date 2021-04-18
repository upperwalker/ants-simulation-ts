const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
  // plugins: [ 
  //     new HtmlWebpackPlugin({
  //         title: '',
  //         template: path.resolve(__dirname, './src/index.html'), 
  //         filename: 'index.html',
  //     }),
  //     //new CleanWebpackPlugin(),
  //     //new CopyPlugin({
  // ],
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    publicPath: '/dist/',
    host: 'localhost',
    port: 8080,
    open: false
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};