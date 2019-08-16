import {
    INDEX_GET_BASIC_INFO,
    INDEX_GET_SCHOOL_INFO,
    INDEX_GET_APP_INFO,
    INDEX_GET_PEOPLE_INFO,
    INDEX_GET_GREETING_INFO
} from "./types";

import { setRoute, registRouter } from "@/libs/util";

import axios from "@utils/ajax";

import { awaitWrap } from "@utils";

import { getBasicInfo, getSchoolInfo, getPeopleInfo, getAppInfo, getGreeting } from "@api/service";

import { Message } from "iview";

export default {
    async getRouter({ commit }, params = {}) {
        let storageRoutes = JSON.parse(sessionStorage.getItem("routes") || "[]");

        //router不存在时重新拉取
        if (!storageRoutes.length) {
            const [err, datas] = await awaitWrap(axios.post("/router/list"));
            if (err) {
                Message.error(err || "导航初始化失败，请稍后重试！");
                return;
            }
            storageRoutes = setRoute(datas.rows);

            sessionStorage.setItem("routes", JSON.stringify(storageRoutes));
        }

        const menuList = await registRouter(storageRoutes);

        commit("setOriginRouter", storageRoutes);

        commit("setOriginMenuList", menuList);
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
