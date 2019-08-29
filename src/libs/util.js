import Cookies from "js-cookie";

import Main from "@views/Main.vue";
import router from "../router";
// cookie保存的天数
import config from "@utils/config";
import { forEach, hasOneOf, objEqual, genID } from "@/libs/tools";
const { title, cookieExpires, useI18n } = config;

const regHome = /home_[\d\w]+/;

export const TOKEN_KEY = "token";
//处理转化路由数据
export const setRoute = route => {
    let parents = route.filter(item => item.canUsed);

    function trans(data) {
        return data.map(parent => {
            let { title, icon, path, isLeaf, parentId } = parent;

            let obj = {
                path: "",
                name: "",
                id: genID(),
                meta: {
                    parentId: parentId || "",
                    icon: icon || "",
                    title,
                    url: path,
                    href: !!path && path.startsWith("_") ? path.substr(1) : "",
                    isLeaf: !!isLeaf,
                    hasChild: !!hasChild(parent)
                }
            };

            if (!!isLeaf && path && path.split("#/")[1]) {
                path = path.split("#/")[1];
            } else {
                path = `home_0${obj.id}`;
            }

            obj.path = `/${path}`;

            obj.name = path;

            if (parent.children && parent.children.length > 0) {
                //递归处理只有一个子集菜单的显示问题
                if (parent.children.length === 1) {
                    obj.meta.showAlways = true;
                }
                obj.children = trans(parent.children);
            }

            return obj;
        });
    }

    const transData = trans(parents);

    return transData;
};

//根据name寻找url
export function findUrl(data, name) {
    let url = "";

    function findName(data, name) {
        for (let item of data) {
            if (item.name === name && item.meta.url !== "") {
                url = item.meta.url;
                break;
            }

            if (item.children && item.children.length) {
                findName(item.children, name);
            }
        }
    }

    findName(data, name);

    return url;
}

export function finSideMenu(data, route) {
    let parents = data.filter(it => it.meta && it.meta.parentId === "0");

    let name = route.name;

    function concatChild(data) {
        let arr = [];
        data.forEach(next => {
            if (next.children && next.children.length) {
                arr = arr.concat(concatChild(next.children));
            }
            arr.push(next);
        });

        return arr;
    }

    let parent = parents.find(it => {
        if (it.name === name) {
            return true;
        } else if (it.children && it.children.length) {
            return concatChild(it.children).some(it => it.name === name);
        }
    });
    return parent;
}

/**
 * 设置一级导航路由为子集的第一个路由
 */
export const getNavList = routes => {
    let oldRoute = routes.filter(route => regHome.test(route.name));

    let initNav = data => {
        for (let route of data) {
            if (regHome.test(route.name) && route.children) {
                initNav(route.children);
            }
            if (route.children) {
                route.name = route.children[0].name;
                route.path = route.children[0].path;
            }
        }
        return data;
    };

    return initNav(JSON.parse(JSON.stringify(oldRoute)));
};

//注册完整路由
export const registRouter = routes => {
    return new Promise(resolve => {
        function addComponent(routes) {
            return routes.map(it => {
                it.component = Main;
                if (it.children && it.children.length) {
                    it.children = addComponent(it.children);
                }
                return it;
            });
        }

        let menuRoute = addComponent(routes);

        router.addRoutes(menuRoute);

        router.onReady(function() {
            resolve(menuRoute);
        });
    });
};

export const setNames = routes => {
    let init = [config.homeName];
    function findname(routes) {
        return routes.reduce(function(prev, cur, index, arr) {
            if (cur.name && prev.indexOf(cur.name) === -1) {
                //去除重复名称
                prev.push(cur.name);
            }
            if (cur.children && cur.children.length) {
                findname(cur.children);
            }
            return prev;
        }, init);
    }
    return findname(routes);
};

export const setToken = token => {
    Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 });
};

export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY);
    if (token) return token;
    else return false;
};

export const hasChild = item => {
    return item.children && item.children.length !== 0;
};

const showThisMenuEle = (item, access) => {
    if (item.meta && item.meta.access && item.meta.access.length) {
        if (hasOneOf(item.meta.access, access)) return true;
        else return false;
    } else return true;
};
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
    let res = [];
    forEach(list, item => {
        if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
            let obj = {
                icon: (item.meta && item.meta.icon) || "",
                name: item.name,
                meta: item.meta
            };
            if (
                (hasChild(item) || (item.meta && item.meta.showAlways)) &&
                showThisMenuEle(item, access)
            ) {
                obj.children = getMenuByRouter(item.children, access);
            }
            if (item.meta && item.meta.href) obj.href = item.meta.href;
            if (showThisMenuEle(item, access)) res.push(obj);
        }
    });
    return res;
};

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (route, homeRoute) => {
    let homeItem = { ...homeRoute, icon: homeRoute.meta.icon };
    let routeMetched = route.matched;
    if (routeMetched.some(item => item.name === homeRoute.name)) return [homeItem];
    let res = routeMetched
        .filter(item => {
            return item.meta === undefined || !item.meta.hideInBread;
        })
        .map(item => {
            let meta = { ...item.meta };
            if (meta.title && typeof meta.title === "function") {
                meta.__titleIsFunction__ = true;
                meta.title = meta.title(route);
            }
            let obj = {
                icon: (item.meta && item.meta.icon) || "",
                name: item.name,
                meta: meta
            };
            return obj;
        });
    res = res.filter(item => {
        return !item.meta.hideInMenu;
    });
    //此处增加首页可配修改 bak [{ ...homeItem, to: homeRoute.path }, ...res]
    return homeItem.meta.hideInBread ? res : [{ ...homeItem, to: homeRoute.path }, ...res];
};

export const getRouteTitleHandled = route => {
    let router = { ...route };
    let meta = { ...route.meta };
    let title = "";
    if (meta.title) {
        if (typeof meta.title === "function") {
            meta.__titleIsFunction__ = true;
            title = meta.title(router);
        } else title = meta.title;
    }
    meta.title = title;
    router.meta = meta;
    return router;
};

export const showTitle = (item, vm) => {
    let { title, __titleIsFunction__ } = item.meta;
    if (!title) return;
    if (useI18n) {
        if (title.includes("{{") && title.includes("}}") && useI18n)
            title = title.replace(/({{[\s\S]+?}})/, (m, str) =>
                str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim()))
            );
        else if (__titleIsFunction__) title = item.meta.title;
        else title = vm.$t(item.name);
    } else title = (item.meta && item.meta.title) || item.name;
    return title;
};

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
    localStorage.tagNaveList = JSON.stringify(list);
};
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
    const list = localStorage.tagNaveList;
    return list ? JSON.parse(list) : [];
};

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = "home") => {
    let i = -1;
    let len = routers.length;
    let homeRoute = {};
    while (++i < len) {
        let item = routers[i];
        if (item.children && item.children.length) {
            let res = getHomeRoute(item.children, homeName);
            if (res.name) return res;
        } else {
            if (item.name === homeName) homeRoute = item;
        }
    }
    return homeRoute;
};

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
    const { name, path, meta } = newRoute;
    let newList = [...list];
    if (newList.findIndex(item => item.name === name) >= 0) return newList;
    else newList.push({ name, path, meta });
    return newList;
};

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
    if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access);
    else return true;
};

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
    const routePermissionJudge = list => {
        return list.some(item => {
            if (item.children && item.children.length) {
                return routePermissionJudge(item.children);
            } else if (item.name === name) {
                return hasAccess(access, item);
            }
        });
    };

    return routePermissionJudge(routes);
};

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
    const keyValueArr = url.split("?")[1].split("&");
    let paramObj = {};
    keyValueArr.forEach(item => {
        const keyValue = item.split("=");
        paramObj[keyValue[0]] = keyValue[1];
    });
    return paramObj;
};

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
    let res = {};
    if (list.length === 2) {
        res = getHomeRoute(list);
    } else {
        const index = list.findIndex(item => routeEqual(item, route));
        if (index === list.length - 1) res = list[list.length - 2];
        else res = list[index + 1];
    }
    return res;
};

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
    let i = -1;
    while (++i < times) {
        callback(i);
    }
};

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = file => {
    let nameSplit = file.name.split(".");
    let format = nameSplit[nameSplit.length - 1];
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsText(file); // 以文本格式读取
        let arr = [];
        reader.onload = function(evt) {
            let data = evt.target.result; // 读到的数据
            let pasteData = data.trim();
            arr = pasteData
                .split(/[\n\u0085\u2028\u2029]|\r\n?/g)
                .map(row => {
                    return row.split("\t");
                })
                .map(item => {
                    return item[0].split(",");
                });
            if (format === "csv") resolve(arr);
            else reject(new Error("[Format Error]:你上传的不是Csv文件"));
        };
    });
};

/**
 * @param {Array} array 表格数据二维数组
 * @returns {Object} { columns, tableData }
 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
 */
export const getTableDataFromArray = array => {
    let columns = [];
    let tableData = [];
    if (array.length > 1) {
        let titles = array.shift();
        columns = titles.map(item => {
            return {
                title: item,
                key: item
            };
        });
        tableData = array.map(item => {
            let res = {};
            item.forEach((col, i) => {
                res[titles[i]] = col;
            });
            return res;
        });
    }
    return {
        columns,
        tableData
    };
};

export const findNodeUpper = (ele, tag) => {
    if (ele.parentNode) {
        if (ele.parentNode.tagName === tag.toUpperCase()) {
            return ele.parentNode;
        } else {
            return findNodeUpper(ele.parentNode, tag);
        }
    }
};

export const findNodeUpperByClasses = (ele, classes) => {
    let parentNode = ele.parentNode;
    if (parentNode) {
        let classList = parentNode.classList;
        if (classList && classes.every(className => classList.contains(className))) {
            return parentNode;
        } else {
            return findNodeUpperByClasses(parentNode, classes);
        }
    }
};

export const findNodeDownward = (ele, tag) => {
    const tagName = tag.toUpperCase();
    if (ele.childNodes.length) {
        let i = -1;
        let len = ele.childNodes.length;
        while (++i < len) {
            let child = ele.childNodes[i];
            if (child.tagName === tagName) return child;
            else return findNodeDownward(child, tag);
        }
    }
};

export const showByAccess = (access, canViewAccess) => {
    return hasOneOf(canViewAccess, access);
};

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
    const params1 = route1.params || {};
    const params2 = route2.params || {};
    const query1 = route1.query || {};
    const query2 = route2.query || {};
    return route1.name === route2.name && objEqual(params1, params2) && objEqual(query1, query2);
};

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
    let len = tagNavList.length;
    let res = false;
    doCustomTimes(len, index => {
        if (routeEqual(tagNavList[index], routeItem)) res = true;
    });
    return res;
};

export const localSave = (key, value) => {
    localStorage.setItem(key, value);
};

export const localRead = key => {
    return localStorage.getItem(key) || "";
};

// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame =
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                return window.setTimeout(callback, 1000 / 60);
            };
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil((difference / duration) * 50);

    const scroll = (start, end, step) => {
        if (start === end) {
            endCallback && endCallback();
            return;
        }

        let d = start + step > end ? end : start + step;
        if (start > end) {
            d = start - step < end ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    };
    scroll(from, to, step);
};

/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
export const setTitle = (routeItem, vm) => {
    const handledRoute = getRouteTitleHandled(routeItem);
    const pageTitle = showTitle(handledRoute, vm);
    const resTitle = pageTitle ? `${title} - ${pageTitle}` : title;
    window.document.title = resTitle;
};
