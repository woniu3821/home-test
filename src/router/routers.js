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
    }
];
