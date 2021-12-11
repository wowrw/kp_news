
/**
 * vue-cli 打包配置文件
 * vue.config.js
 */
const { resolve } = require("path");
const path = require("path");

// 构建工具函数
const utils = {
  // 处理路径
  resolve (dir) {
    return path.join(__dirname, dir);
  }
}

// 环境配置
const configEnv = require("./config");

// 判断是否是生产环境
let isProd = process.env.NODE_ENV == "production" ? true : false;

const config = {
  // 部署应用包时的基本 URL
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。
  // 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
  // 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径
  publicPath: configEnv.publicPath,

  assetsDir: "assets", //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 输出文件目录
  outputDir: "dist",
  // webpack-dev-server 相关配置
  devServer: {
    // 设置主机地址
    //host: "0.0.0.0",
    // 设置默认端口
    port: 8080,
    // 禁用host验证
    //disableHostCheck: true,
    // 设置代理
    // proxy: {
    //   [configEnv.baseApi]: {

    //     target: configEnv.target,  // 目标 API 地址

    //     changeOrigin: true, //允许跨域
    //     pathRewrite: {
    //       [`^${configEnv.baseApi}`]: "",  //重写路径
    //     },
    //   },
    // },
  },


  chainWebpack (config) {
    // 移除资源预加载(路由懒加载才能正常使用)
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test
    // 设置别名
    config.resolve.alias
      .set("@", utils.resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))   
      

    //参考链接：https://blog.csdn.net/qq_26769677/article/details/107475803
    const svgRule = config.module.rule('svg');
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .include.add(resolve('src/icons/svg')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',  //定义规则 使用时 <svg class="icon"> <use xlink:href="#icon-svg文件名"></use>  </svg>
      })
      .end();     

    // 修改images loader 添加svg处理 让其他svg loader不要对src/icons进行操作
    const imagesRule = config.module.rule("images");
    imagesRule.exclude.add(resolve("src/icons"));
    imagesRule.test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);

  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'text-color': '#111',
            // 'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径
            hack: `true; @import "@/assets/css/theme_var.less";`,
          },
        },
      },
      sass: {
        // 配置scss 全局样式文件 支持全局变量
        prependData: `
        @import "@/assets/css/common.scss";
      `,
      },
    },
  },
};
// 打印webpack配置信息
console.log(JSON.stringify(config))
module.exports = config;