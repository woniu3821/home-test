import { findComponentDownward } from "@libs/assist";

import { typeOf } from "@libs/assist.js";

export const awaitWrap = promise =>
    promise
        .then(res => {
            if (res.status === 200 && res.data.code == 0) {
                return [null, res.data.datas];
            }
            return [res.data.message, null];
        })
        .catch(err => {
            const msg = typeof err === "object" ? err.message : err;
            return [msg, null];
        });

export const chunk = (arr, size) => {
    const arr2 = [];
    for (let i = 0; i < arr.length; i += size) {
        arr2.push(arr.slice(i, i + size));
    }
    return arr2;
};

export const toArr = num => {
    const arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(i);
    }
    return arr;
};

export const cloneForm = (from, to) => {
    if (!(from instanceof Object) || !(to instanceof Object)) {
        return from;
    }
    const newForm = {};
    for (const p in from) {
        newForm[p] = to[p] === null ? from[p] : to[p];
    }
    return newForm;
};

export const messageFn = type => {
    //不同项目通信定制场景
    function updateOringin(event) {
        if (window.frames["home_iframe"])
            window.frames["home_iframe"].postMessage(
                { type: "origin", origin: location.origin },
                event.origin
            );
    }

    const mapFn = {
        //用于后退路由改变
        route(data, event) {
            updateOringin(event);

            let route = data.route;

            if (!route || !this.$store.state.routeNames.includes(route.name)) return;

            this.$router.push(route);
        },
        redirect(data, event) {
            updateOringin(event);

            let route = data.route;
            if (route) {
                findComponentDownward(this, "Home").changeUrl(route.path);
                // if (route.name && this.$store.state.routeNames.includes(route.name)) {
                //     // this.$router.push({ name: route.name });
                //     // findComponentDownward(this, "Home").changeUrl(route.path);
                // } else {
                //     findComponentDownward(this, "Home").changeUrl(route.path);
                // }
            }
        }
    };
    if (!mapFn[type]) return;

    return mapFn[type];
};

export function listenerMessage() {
    const _this = this;
    function receiveMessage(event) {
        if (!event.data.type || typeOf(messageFn(event.data.type)) !== "function") return;
        messageFn(event.data.type).call(_this, event.data, event);
    }
    window.addEventListener("message", receiveMessage, false);
}
