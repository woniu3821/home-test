/* eslint-disable */
/**
 * 本文件由工具自动生成，请勿随意改动！！！
 * @name CMP Devops API
 * @description The API definition for the Devops Console of Cloud Manage Platform.
 * @tutorial public/wec-smmp-home.yaml
 */
const DEV_MODE = process.env.NODE_ENV === 'development'

const API_BASE = DEV_MODE ? '/wec-smmp-home' : ''

const _basePath = (url) => {
    return `${API_BASE}${url}`
}

export default {
    system_getbasicinfo: _basePath('/system/getBasicInfo'), // 获取基本信息
    school_getschoolinfo: _basePath('/school/getSchoolInfo'), // 获取学校信息
    school_getpeopleinfo: _basePath('/school/getPeopleInfo'), // 获取人员信息
    school_getappinfo: _basePath('/school/getAppInfo'), // 获取应用信息
    greeting_getgreeting: _basePath('/greeting/getGreeting'), // 获取问候语
}
