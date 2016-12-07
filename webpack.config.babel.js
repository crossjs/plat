import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import _debug from 'debug'
import config, { paths } from './config'

const { __DEV__, __PROD__, __TEST__ } = config.globals
const debug = _debug('plato:webpack')

debug('Create configuration.')

const webpackConfig = {
  target: 'web',
  resolve: {
    modules: [paths.src(), 'node_modules'],
    extensions: ['.css', '.js', '.json', '.vue'],
    alias: {
      styles: paths.src(`themes/${config.theme}`)
    }
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  devtool: config.compiler_devtool,
  devServer: {
    host: config.server_host,
    port: config.server_port,
    // proxy is useful for debugging
    proxy: [{
      context: '/api',
      target: 'http://localhost:3001',
      pathRewrite: {
        '^/api': '' // Host path & target path conversion
      }
    }],
    compress: true,
    hot: true,
    noInfo: true
  },
  entry: {
    app: [
      // load the specific polyfills
      paths.src('polyfills/index.js'),
      paths.src('index.js')],
    vendor: config.compiler_vendor
  },
  output: {
    path: paths.dist(),
    publicPath: config.compiler_public_path,
    filename: `[name].[${config.compiler_hash_type}].js`,
    chunkFilename: `[id].[${config.compiler_hash_type}].js`
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: __DEV__,
          formatter: require('eslint-friendly-formatter')
        },
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: __PROD__ ? ExtractTextPlugin.extract({
              loader: 'css-loader?sourceMap',
              fallbackLoader: 'vue-style-loader'
            }) : 'vue-style-loader!css-loader?sourceMap',
            js: 'babel-loader'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /@[1-3]x\S*\.(png|jpg|gif)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
        exclude: /@[1-3]x/, // skip encoding @1x/@2x/@3x images with base64
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.src('index.ejs'),
      title: `${config.pkg.name} - ${config.pkg.description}`,
      hash: false,
      inject: true,
      minify: {
        collapseWhitespace: config.compiler_html_minify,
        minifyJS: config.compiler_html_minify
      }
    }),
    new CopyWebpackPlugin([{
      from: paths.src('static')
    }], {
      // ignore: ['*.ico', '*.md']
    })
  ]
}

// ------------------------------------
// Plugins
// ------------------------------------

const vueLoaderOptions = {
  postcss: pack => {
    return [
      require('postcss-import')({
        path: paths.src(`themes/${config.theme}`),
        // use webpack context
        addDependencyTo: pack
      }),
      require('postcss-url')({
        basePath: paths.src('static')
      }),
      require('postcss-cssnext')({
        // see: https://github.com/ai/browserslist#queries
        browsers: 'Android >= 4, iOS >= 7',
        features: {
          customProperties: {
            variables: require(paths.src(`themes/${config.theme}/variables`))
          }
        }
      }),
      require('postcss-flexible')({
        remUnit: 75
      }),
      require('postcss-browser-reporter')(),
      require('postcss-reporter')(),
      require('postcss-rtl')({
        // Custom function for adding prefix to selector. Optional.
        addPrefixToSelector (selector, prefix) {
          // console.log(/^\[data-dpr=["']\d["']]/.test('[')) 以[data-dpr="1"]开头，就连写，目的是为了让[dir]与[data-dpr]构成兄弟关系；否则，就分开写，为了让其他非[data-dpr]的元素与[dir]构成父子关系
          if (/^\[data-dpr=["']\d["']]/.test(selector)) { //  匹配 [data-dpr="1"] 时，不能加空格
            return `${prefix}${selector}`
          }
          return `${prefix} ${selector}`
        }
      })
    ]
  },
  autoprefixer: false
}

if (__PROD__) {
  debug('Enable plugins for production (Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        context: __dirname
      },
      vue: vueLoaderOptions
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin('[name].[contenthash].css')
  )
} else {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: __dirname
      },
      vue: vueLoaderOptions
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new FaviconsWebpackPlugin({
      logo: paths.src('assets/logo.svg'),
      prefix: 'icons-[hash:7]/',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'common.js'
    })
  )
}

export default webpackConfig
