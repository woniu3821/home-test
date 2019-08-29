import Vue from "vue";
import Router from "vue-router";
import routes from "./routers";

import { Notice, LoadingBar } from "iview";

Vue.use(Router);

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    /* must call `next` */
    LoadingBar.start();

    if (!to.matched && !to.matched.length) {
        Notice.error({
            title: "无效导航路由",
            desc: ""
        });

        next("无效导航路由");
    } else {
        next();
    }
});

router.afterEach(() => {
    LoadingBar.finish();
});

router.onError(function() {
    LoadingBar.error();
});

export default router;
