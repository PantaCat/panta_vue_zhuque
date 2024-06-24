const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',  // 此前端项目的IP地址
    port: 9002,  // 此前端项目的端口号
    open: true,  //表示在启动开发服务器时，会自动打开浏览器并访问指定的地址
    proxy: {
      '/api': {
        target: 'http://localhost:9001', //接口域名
        changeOrigin: true,       //是否跨域
        pathRewrite: {
          '^/api': ''  //假如我们的地址是 /api/member/getToken 会转化为 /member/getToken
        }
      }
    }
  }
})