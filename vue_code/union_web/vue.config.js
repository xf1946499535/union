const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  devServer: {
    // 项目启动端口之后会变成3000
    port: 8289,
    disableHostCheck: true
  },
  productionSourceMap: false,

  //打包时开启这段代码
  // configureWebpack: {
  //   plugins: [
  //     new CompressionPlugin({
  //       test: /\.(js|css)?$/i, // 哪些文件要压缩
  //       filename: '[path].gz[query]',　// 压缩后的文件名
  //       algorithm: 'gzip',　// 使用gzip压缩
  //       minRatio: 1,　// 压缩率小于1才会压缩
  //       deleteOriginalAssets: true // 删除未压缩的文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false
  //     })
  //   ]
  // }
}