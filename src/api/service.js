/* eslint-disable */
/**
 * 本文件由工具自动生成，请勿随意改动！！！
 * @name CMP Devops API
 * @description The API definition for the Devops Console of Cloud Manage Platform.
 * @tutorial public/wec-smmp-home.yaml
 */
import api from '@api/api'
import http from '@utils/ajax'
import { awaitWrap } from "@utils";

/**
 * 获取基本信息
 * @param { Array } params 请求参数
 */
export const  getBasicInfo =async (params) => {
    // send request
    return awaitWrap(http.post(api.system_getbasicinfo, params))
}

/**
 * 获取学校信息
 * @param { Array } params 请求参数
 */
export const  getSchoolInfo =async (params) => {
    // send request
    return awaitWrap(http.post(api.school_getschoolinfo, params))
}

/**
 * 获取人员信息
 * @param { Array } params 请求参数
 */
export const  getPeopleInfo =async (params) => {
    // send request
    return awaitWrap(http.post(api.school_getpeopleinfo, params))
}

/**
 * 获取应用信息
 * @param { Array } params 请求参数
 */
export const  getAppInfo =async (params) => {
    // send request
    return awaitWrap(http.post(api.school_getappinfo, params))
}

/**
 * 获取问候语
 * @param { Array } params 请求参数
 */
export const  getGreeting =async (params) => {
    // send request
    return awaitWrap(http.post(api.greeting_getgreeting, params))
}

