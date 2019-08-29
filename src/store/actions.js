import {
    INDEX_GET_BASIC_INFO,
    INDEX_GET_SCHOOL_INFO,
    INDEX_GET_APP_INFO,
    INDEX_GET_PEOPLE_INFO,
    INDEX_GET_GREETING_INFO
} from "./types";

import { setRoute, registRouter, setNames } from "@/libs/util";

import axios from "@utils/ajax";

import { awaitWrap } from "@utils";

import { getBasicInfo, getSchoolInfo, getPeopleInfo, getAppInfo, getGreeting } from "@api/service";

import { Message } from "iview";

export default {
    async getRouter({ commit, state }, params = {}) {
        let storageRoutes = JSON.parse(sessionStorage.getItem("routes") || "[]");

        //router不存在时重新拉取
        if (!storageRoutes.length || !state.schoolName) {
            const [err, datas] = await getBasicInfo(params);
            // const [err, datas] = await awaitWrap(axios.post("/router/getBasicInfo"));
            if (err) {
                Message.error(err || "导航初始化失败，请稍后重试！");
                return;
            }
            storageRoutes = setRoute(datas.menus);

            //更新登录信息
            commit(INDEX_GET_BASIC_INFO, datas);

            // storageRoutes = setRoute(datas.rows);

            sessionStorage.setItem("routes", JSON.stringify(storageRoutes));
        }
        //防止重复注册路由
        if (state.hasRegister) return;

        const menuList = await registRouter(storageRoutes);

        commit("changeRegister");

        const names = setNames(menuList);

        commit("setOriginRouter", storageRoutes);

        commit("setOriginMenuList", menuList);

        commit("setNames", names);
        //设置默认重定向地址
        commit("setRedirect", names[1] || "");
    },
    async [INDEX_GET_BASIC_INFO]({ commit }, params = {}) {
        const [err, datas] = await getBasicInfo(params);
        commit(INDEX_GET_BASIC_INFO, datas);
    },
    //获取学校信息
    async [INDEX_GET_SCHOOL_INFO]({ commit }, params = {}) {
        const [err, datas] = await getSchoolInfo(params);
        commit(INDEX_GET_SCHOOL_INFO, datas);
    },
    async [INDEX_GET_APP_INFO]({ commit }, params = {}) {
        const [err, datas] = await getAppInfo(params);
        commit(INDEX_GET_APP_INFO, datas);
    },
    async [INDEX_GET_PEOPLE_INFO]({ commit }, params = {}) {
        const [err, datas] = await getPeopleInfo(params);
        commit(INDEX_GET_PEOPLE_INFO, datas);
    },
    async [INDEX_GET_GREETING_INFO]({ commit }, params = {}) {
        const [err, datas] = await getGreeting(params);
        commit(INDEX_GET_GREETING_INFO, datas);
    },
    //退出登录
    async handleLogOut() {
        window.location.href = "/wec-amp-portal/logout";
    }
};
