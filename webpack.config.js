var webpack = require('webpack');
var config = require('./config');
var WriteFilePlugin = require('write-file-webpack-plugin');

var isProduction = (process.env.NODE_ENV === 'production');

var entryPoint = isProduction ? `${config.appDir}/index.jsx` : [
  'webpack-dev-server/client?http://localhost:8000',
  'webpack/hot/only-dev-server',
  `${config.appDir}/index.jsx`
];

var webpackConfig = {
  entry: {
    app: entryPoint
  },
  output: {
    path: config.buildDir + '/js',
    publicPath: '',
    filename: 'bundle.js'
  },
  devServer: {
    hot: true,
    host: 'localhost',
    port: 8000,
    historyApiFallback: true
  },
  devtool: isProduction ? false : 'eval',
  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.scss$/,
        include: /app\/components/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader?importLoaders=1',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {loader: 'sass-loader'},
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /app\/components/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css']
  }
};

module.exports = webpackConfig;
