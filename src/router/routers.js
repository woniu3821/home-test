import Main from "@views/Main.vue";
// import Home from "@views/Home.vue";
export default [
    {
        path: "/home",
        name: "home",
        meta: {
            icon: "md-home",
            title: "首页",
            hideInMenu: true,
            hideInBread: true
        },
        component: Main
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
        path: "/700",
        name: "700",
        meta: {
            hideInMenu: true
        }
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
            hideInMenu: true,
            hideInBread: true
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
