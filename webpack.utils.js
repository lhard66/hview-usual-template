'use strict'
const fs = require('fs')
const path = require('path')
const config = require('../config')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageConfig = require('../package.json')

const isProduction = process.env.NODE_ENV === 'production'

// 入口配置
const entryConfig = {
  index: 'core',
  login: 'login',
  indexTheme: 'core/themes',
  loginTheme: 'login/themes',
}

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  // posix多平台兼容
  return path.posix.join(assetsSubDirectory, _path)
}

function resolvePath(p) {
  return path.join(__dirname, '..', `src/${p}`)
}

function getThemes() {
  const themeKeys = Object.keys(entryConfig).filter(key => key.includes('Theme'));
  const themes = {};
  themeKeys.forEach(key => {
    const fileNames = fs.readdirSync(resolvePath(`${entryConfig[key]}`)).filter(name => name !== 'index.js');
    fileNames.forEach(name => {
      themes[`${key}${path.basename(name, '.scss')}`] = resolvePath(`${entryConfig[key]}/${name}`);
    })
  })
  return themes;
}
// {t1: '/theme/t1', t2: '/theme/t2'}
const allthemes = getThemes();

function creatExtractThemes(names) {
  return names.map(name => {
    return new ExtractTextPlugin({
      filename: exports.assetsPath(`css/${name}.css`),
      allChunks: true,
    })
  })
}

// 核心：生成样式提取对象
exports.extractThemes = creatExtractThemes(Object.keys(allthemes));

// 核心：样式分离打包
exports.extractCSS = new ExtractTextPlugin({
  filename: exports.assetsPath('css/[name].[contenthash].css'),
  allChunks: true,
});

function generateLoaders (options, loader, loaderOptions) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

  if (loader) {
    loaders.push({
      loader: loader + '-loader',
      options: Object.assign({}, loaderOptions, {
        sourceMap: options.sourceMap
      })
    })
  }

  // Extract CSS when that option is specified
  // (which is the case during production build)
  if (options.extract) {
    if (options.extractType === 'theme') {
      return exports.extractThemes[options.themeNameIndex].extract({
        use: loaders,
      })
    } else {
      return exports.extractCSS.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    }
  } else {
    return ['vue-style-loader'].concat(loaders)
  }
}


exports.cssLoaders = function (options) {
  // 普通css的loader
  options = Object.assign({extractType: 'css'}, options);

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(options),
    postcss: generateLoaders(options),
    less: generateLoaders(options, 'less'),
    sass: generateLoaders(options, 'sass', { indentedSyntax: true }),
    scss: generateLoaders(options, 'sass').concat({
      loader: 'sass-resources-loader',
      options: {
        // 注册sass全局变量
        resources: config.sassVarPath.map(p => {
          return path.resolve(__dirname, p);
        }),
      }
    }),
    stylus: generateLoaders(options, 'stylus'),
    styl: generateLoaders(options, 'stylus')
  }
}

// 生成多主题loader
function themeLoaders(options) {
  // 主题css的loader
  options = Object.assign({extractType: 'theme'}, options);

  return Object.values(allthemes).map((fullPath, index) => {
      return {
        test: /\.scss$/,
        include: fullPath,
        use: generateLoaders(Object.assign(options, {themeNameIndex: index}), 'sass'),
      }
    })
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  // console.log('myTest', allthemes);
  // console.log('test', exports.extractThemes);
  // console.log('test', exports.extractCSS);
  // console.log('test2', Object.values(allthemes));
  console.log('test3', themeLoaders(options));
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      exclude: Object.values(allthemes),
      use: loader
    })
  }
  // return output.concat(themeLoaders(options));
  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

// 多入口配置
exports.entries = function() {
  const realPathEntries = {};
  for (const key of Object.keys(entryConfig)) {
    realPathEntries[key] = resolvePath(entryConfig[key]);
  }
  console.log('entries', realPathEntries);
  return realPathEntries;
}

// 多页面输出配置
exports.htmlPlugin = function() {
  return Object.keys(entryConfig).map(key => {
    if (!key.includes('Theme')) {
      // 通用配置
      let conf = {
        title: isProduction ? '哗啦啦财务系统' : `财务测试环境(build: ${new Date().toLocaleString()})`,
        template: resolvePath(`${entryConfig[key]}/index.ejs`), // 模板来源
        filename: `${key}.html`, // 文件名称
        chunks: ['manifest', 'vendor', key], // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
        inject: true,
        chunksSortMode: 'manual',
        excludeChunks: ['indexTheme', 'loginTheme'],
      }

      // 生产环境特有配置
      if (isProduction) {
        conf = merge(conf, {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
          },
        })
      }

      return new HtmlWebpackPlugin(conf)
    }
  })
}
