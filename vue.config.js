const path = require('path')
const CompressionWebpackplugin = require('compression-webpack-plugin');
// 判断开发环境
const isProduction = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  productionSourceMap: false, // 打包时不生成.map文件
  lintOnSave: false, // 如果你不需要使用eslint，把lintOnSave设为false即可
  css:{
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    },
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps
  },
  chainWebpack : config => {
    config.resolve.alias
    .set('@', resolve('src'))
  },
  configureWebpack: config => {
    // 开启gzip压缩
    config.plugins.push(new CompressionWebpackplugin({
      algorithm: 'gzip',
      test: /\.js$|\.html$|\.json$|\.css$|\.png$|\.jpg$|\.ttf/,
      threshold: 10240,
      minRatio: 0.8
    }));
    // 开启分离js
    config.optimization = {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name (module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    };
    // 取消webpack警告的性能提示
    config.performance = {
      hints:'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  }
}