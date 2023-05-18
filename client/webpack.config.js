const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/index.js',
    install: './src/js/install.js',
    header: './src/js/header.js',
    editor: './src/js/editor.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html'
    }),
    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'PWA Text Editor',
      short_name: 'Text Editor',
      description: 'Text Editor made into a PWA',
      background_color: '#ffffff',
      theme_color: '#000000',
      start_url: '/',
      publicPath: '/',
      icons: [{
        src: path.resolve('src/images/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join('assets', 'icons')
      }]
    }),
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js',
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
