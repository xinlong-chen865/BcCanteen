// resolve定义一个绝对路径获取函数
const path = require('path')
const bodyParser = require("body-parser");

function resolve(dir) {
  return path.join(__dirname, dir)
}

// commonjs nodejs
const port = 7070;
const title = '北城外卖平台';

module.exports = {
    publicPath: '/',
    devServer: {
        port,
        proxy: {
            // 代理 /dev-api/user/login 到 http://127.0.0.1:3000/user/login
            [process.env.VUE_APP_BASE_API]: {
              target: `http://127.0.0.1:3000/`,
              changeOrigin: true, // 要不要变更origin头
              pathRewrite: { // 地址重写：http://127.0.0.1:3000/user/login
                ["^" + process.env.VUE_APP_BASE_API]: ""
              }
            }
          },
    },
    configureWebpack: {
        name: title
    },
}