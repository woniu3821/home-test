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
            // hideInBread: true
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
        path: "/401",
        name: "error_401",
        meta: {
            hideInMenu: true
        },
        component: () => import("@components/error-page/401.vue")
    },
    {
        path: "/500",
        name: "error_500",
        meta: {
            hideInMenu: true
        },
        component: () => import("@components/error-page/500.vue")
    },
    {
        path: "*",
        redirect: "/home",
        name: "blank",
        meta: {
            hideInMenu: true
        }
    }
    // {
    //     path: "*",
    //     name: "error_404",
    //     meta: {
    //         hideInMenu: true
    //     },
    //     component: () => import("@components/error-page/404.vue")
    // }
];
