const path = require("path");

module.exports = {
    baseUrl: "/wec-smmp-home",
    // 接口ymal文档配置
    pathYaml: "public/wec-smmp-home.yaml",
    pathApi: path.resolve(__dirname, "../api/api.js"),
    pathService: path.resolve(__dirname, "../api/service.js"),
    /**
     * @description 是否使用国际化，默认为false
     *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
     *              用来在菜单中显示文字
     */
    useI18n: false,
    /**
     * @description token在Cookie中存储的天数，默认1天
     */
    cookieExpires: 1,
    /**
     * @description 默认打开的首页的路由name值，默认为home
     */
    homeName: "home",
    /**
     * @description 默认重定向地址
     */
    redirectName: ""
};
