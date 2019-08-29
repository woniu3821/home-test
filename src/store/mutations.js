import {
    getBreadCrumbList,
    setTagNavListInLocalstorage,
    // getMenuByRouter,
    getTagNavListFromLocalstorage,
    getHomeRoute,
    finSideMenu
    // getNextRoute,
    // routeHasExist,
    // routeEqual,
    // getRouteTitleHandled,
    // localSave,
    // localRead,
} from "@/libs/util";
import config from "@utils/config";

import {
    INDEX_GET_BASIC_INFO,
    INDEX_GET_SCHOOL_INFO,
    INDEX_GET_APP_INFO,
    INDEX_GET_PEOPLE_INFO,
    INDEX_GET_GREETING_INFO
} from "./types";
import { Message, Notice } from "iview";

const { homeName } = config;

export default {
    changeNavActiveName(state, payload) {
        state.navActiveName = payload;
    },
    changeRegister(state) {
        state.hasRegister = true;
    },
    setBreadCrumb(state, route) {
        state.breadCrumbList = getBreadCrumbList(route, state.homeRoute);
    },
    setHomeRoute(state, routes) {
        state.homeRoute = getHomeRoute(routes, homeName);
    },
    setTagNavList(state, list) {
        let tagList = [];
        if (list) {
            tagList = [...list];
        } else tagList = getTagNavListFromLocalstorage() || [];
        if (tagList[0] && tagList[0].name !== homeName) tagList.shift();
        let homeTagIndex = tagList.findIndex(item => item.name === homeName);
        if (homeTagIndex > 0) {
            let homeTag = tagList.splice(homeTagIndex, 1)[0];
            tagList.unshift(homeTag);
        }
        state.tagNavList = tagList;
        setTagNavListInLocalstorage([...tagList]);
    },
    setOriginRouter(state, payload) {
        state.routers = payload;
    },
    setOriginMenuList(state, payload) {
        state.menuList = payload;
    },
    setNames(state, payload) {
        state.routeNames = payload;
    },
    //更新左侧菜单
    setMenuList(state, payload) {
        try {
            const parent = finSideMenu(state.routers, payload);
            if (parent) {
                this.commit("changeNavActiveName", parent.id);

                if (parent.children) {
                    state.menuList = parent.children;
                } else if (payload.meta.parentId === "0") {
                    this.commit("setLayout", payload.meta.url);
                }
            }
        } catch (error) {
            Notice.error("导航错误");
        }
    },
    setLayout(state, payload) {
        state.url = payload;
    },
    /**
     * 更新menu激活菜单
     * @param {*} state
     * @param {*} payload
     */
    setActiveName(state, payload) {
        state.activeName = payload;
    },
    setRedirect(state, payload) {
        state.redirectName = payload;
    },
    [INDEX_GET_BASIC_INFO](state, payload) {
        state.user = Object.assign(state.user, payload.user);
        state.logoUrl = payload.logoUrl;
        state.schoolName = payload.schoolName;
    },
    [INDEX_GET_SCHOOL_INFO](state, payload) {
        state.schoolInfo = {
            schoolName: payload.schoolName,
            badgeUrl: payload.schoolBadgeUrl
        };
    },
    [INDEX_GET_APP_INFO](state, payload) {
        state.appInfo = [
            {
                title: "基础应用",
                count: payload.basicAppCount || 0
            },
            {
                title: "云应用",
                count: payload.cloudAppCount || 0
            },
            {
                title: "自建应用",
                count: payload.selfAppCount || 0
            },
            {
                title: "信息服务",
                count: payload.serviceAppCount || 0
            }
        ];
        state.quickApps = payload.quickApps;
    },
    [INDEX_GET_PEOPLE_INFO](state, payload) {
        state.peopleInfo = [
            {
                title: "教职工",
                count: payload.staffCount || 0
            },
            {
                title: "学生",
                count: payload.studentCount || 0
            },
            {
                title: "校友",
                count: payload.alumniCount || 0
            }
        ];
    },
    [INDEX_GET_GREETING_INFO](state, payload) {
        state.greeting = payload + "好！";
    }
};
