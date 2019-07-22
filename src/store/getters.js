import {
    getBreadCrumbList,
    setTagNavListInLocalstorage,
    getMenuByRouter,
    getTagNavListFromLocalstorage,
    getHomeRoute,
    getNextRoute,
    routeHasExist,
    routeEqual,
    getRouteTitleHandled,
    localSave,
    localRead
} from "@/libs/util";

import routers from "@/router/routers";

export default {
    menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.access)
};
