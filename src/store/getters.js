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
    localRead,
    getNavList
} from "@/libs/util";

// import routers from "@/router/routers";

export default {
    menuList: (state, getters, rootState) => getMenuByRouter(rootState.menuList, rootState.access),
    navList: (state, getters, rootState) => {
        return getNavList(state.routers);
    }
};
