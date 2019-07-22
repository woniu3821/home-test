import Main from "@views/Main.vue";
// import Home from "@views/Home.vue";

export default [
    {
        path: "/",
        name: "index",
        redirect: "/home",
        meta: {
            icon: "md-home",
            title: "首页",
            hideInMenu: true
        },
        component: Main,
        children: [
            {
                path: "home",
                name: "home",
                meta: {
                    hideInMenu: true,
                    icon: "md-home",
                    title: "首页"
                    // href: "https://lison16.github.io/iview-admin-doc/#/"
                    // showAlways: true
                },
                component: Main
            }
        ]
    },
    {
        path: "/admin",
        name: "admin",
        meta: {
            icon: "md-arrow-dropdown-circle",
            title: "管理员设置"
            // href: "https://lison16.github.io/iview-admin-doc/#/"
            // showAlways: true
        },
        component: Main
    },
    {
        path: "/domain",
        name: "domain",
        meta: {
            icon: "md-arrow-dropdown-circle",
            title: "域管理"
            // href: "https://lison16.github.io/iview-admin-doc/#/"
            // showAlways: true
        },
        component: Main
    }
];
