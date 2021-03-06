export default {
    //默认重定向地址
    redirectName: "",
    //是否已经注册了路由
    hasRegister: false,
    // 导航菜单url
    url: "",
    //导航activeName
    navActiveName: "",
    //完整路由数据
    routers: [],
    //导航数据
    navList: [],
    //菜单路由
    menuList: [],
    //路由name集合
    routeNames: [],
    //激活的菜单
    activeName: "",
    access: "",
    tagNavList: [],
    breadCrumbList: [],
    homeRoute: {},
    user: {
        userAvatar: require("@assets/img/empty.png"),
        unreadCount: 0,
        userName: ""
    },
    greeting: "早上好！",
    //logo图标
    logoUrl: "",
    //logo租户名称
    schoolName: "",
    schoolInfo: {
        schoolName: "",
        badgeUrl: ""
    },
    quickApps: [],
    peopleInfo: [
        {
            title: "教职工",
            count: 0
        },
        {
            title: "学生",
            count: 0
        },
        {
            title: "校友",
            count: 0
        }
    ],
    appInfo: [
        {
            title: "平台应用",
            count: 0
        },
        {
            title: "云应用",
            count: 0
        },
        {
            title: "自建应用",
            count: 0
        },
        {
            title: "信息服务",
            count: 0
        }
    ]
};
