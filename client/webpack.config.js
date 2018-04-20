const path = require('path');

const page = name => path.resolve(__dirname, 'src', name);

const config = {
  // context: path.resolve(__dirname, ''), // root
  entry: {
    'blog': page('Blog.jsx'),
    'forum': page('Forum.jsx'),
    'index': page('Index.jsx'),
    'newtopic': page('NewTopic.jsx'),
    'profile': page('Profile.jsx'),
    'register': page('Register.jsx'),
    'section': page('Section.jsx'),
    'signin': page('SignIn.jsx'),
    'topic': page('Topic.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'assets', 'js'),
    filename: '[name].js'
  },
  resolve: {
    extensions: [ '.js', '.mjs', '.mjsx', '.jsx', '.css', '.sass', '.scss' ],
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: [ 'chrome >= 63', 'safari >= 11', 'firefox >= 58', 'ie >= 11' ]
                }
              }
            ],
            'stage-0',
            'stage-1',
            'stage-2',
            'stage-3',
            'react'
          ]
        }
      },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.s[ac]ss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] },
    ]
  },
  devtool: 'source-map',
  // mode: 'production',
  mode: 'development',
  performance: {
    hints: 'warning'
  }
};

module.exports = config;