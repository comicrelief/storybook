// base webpack config file
import path from 'path'
import webpack from 'webpack'
import CleanPlugin from 'clean-webpack-plugin'

// project folder
const rootFolder = path.resolve(__dirname, '..')
const outputPath = path.resolve(rootFolder, 'dist')

const configuration = {
  // resolve all relative paths from the project root folder
  context: rootFolder,
  entry: './src/components/index.js',
  output: {
    path: outputPath,
    filename: 'index.js',
    libraryTarget: 'commonjs2', // our Output should be an exportable module!
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loaders: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.svg/,
        loader: 'url-loader',
        options: {
          limit: 26000,
          mimetype: 'image/svg+xml',
          name: 'i/[name]-[hash].[ext]',
        },
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'i/[name]-[hash].[ext]',
        },
      },
    ],
  },

  resolve: {
    // you can now require('file') instead of require('file.[extension]')
    extensions: ['.json', '.js', '.css'],
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    // clears the output folder
    new CleanPlugin([path.relative(rootFolder, outputPath)],
      { root: rootFolder}),
    ],

  externals: {
    'react': 'commonjs react' // use the React dependency of our parent project instead of using our own React.
  }
}

module.exports = configuration
