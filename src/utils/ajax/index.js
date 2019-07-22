import axios from "axios";
import config from "./config";
// 取消重复请求
const cancelToken = axios.CancelToken;
const pendingList = [];
const removePending = config => {
    for (const p in pendingList) {
        const item = p;
        const pendingObj = pendingList[p];
        // 当前请求在数组中存在时执行函数体
        if (
            pendingObj.url ===
            `${config.url}&request_type=${config.method}&params=${JSON.stringify(config.data)}`
        ) {
            // 执行取消操作
            pendingObj.cancel();
            // 从数组中移除记录
            pendingList.splice(item, 1);
        }
    }
};

const service = axios.create(config);

// 添加请求拦截器

service.interceptors.request.use(
    config => {
        removePending(config);
        config.cancelToken = new cancelToken(c => {
            pendingList.push({
                url: `${config.url}&request_type=${config.method}&params=${JSON.stringify(
                    config.data
                )}`,
                cancel: c
            });
        });
        return config;
    },
    error => Promise.reject(error)
);

// 返回状态判断(添加响应拦截器)
service.interceptors.response.use(
    res => {
        removePending(res.config);
        return Promise.resolve(res);
    },
    error => Promise.reject(error)
);

export default service;
