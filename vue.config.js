const PRODUCT = process.env.NODE_ENV === "production";
const config = require("./src/utils/config");

const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: false,
    // 打包文件的前缀
    publicPath: PRODUCT ? "/image/devops-images" : "./",
    // 打包输出目录
    outputDir: "../webapp/devops-images",
    chainWebpack: config => {
        config.resolve.alias
            .set("@styles", resolve("src/styles"))
            .set("@views", resolve("src/views"))
            .set("@pages", resolve("src/pages"))
            .set("@mixins", resolve("src/utils/mixins"))
            .set("@components", resolve("src/components"))
            .set("@assets", resolve("src/assets"))
            .set("@utils", resolve("src/utils"))
            .set("@api", resolve("src/api"))
            .set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set("_c", resolve("src/components"));
    },
    productionSourceMap: false,
    pages: {
        index: {
            // page 的入口
            entry: "./src/main",
            // 模板来源
            template: "public/index.html",
            // 在 dist/index.html 的输出
            filename: "index.html",
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "镜像中心"
        }
    },
    css: {
        loaderOptions: {
            stylus: {
                preferPathResolver: "webpack",
                paths: [path.join(__dirname, "src/styles")],
                import: ["global.styl"]
            }
        }
    },
    devServer: {
        // 本地开发代理地址
        proxy: {
            [config.baseUrl]: {
                target: "http://iwecloud1:31214/",
                // target: "http://172.20.6.88:8080",
                // target: "https://www.easy-mock.com/mock/5d31907e3329c1415ac93f01/image", // easy-mock
                changeOrigin: true
            },
            "/router": {
                target: "https://www.easy-mock.com/mock/5d3670545ac09b4a39d5435e/router", // easy-mock
                changeOrigin: true
            }
        }
    },
    // 解决架子自适应宽度
    configureWebpack: {
        externals: {
            jQuery: "jquery",
            $: "jquery"
        }
    }
};
