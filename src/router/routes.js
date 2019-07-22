const autoImportRoutes = [];

const contexts = require.context("@pages", false, /\.vue$/);

contexts.keys().forEach(component => {
    const componentEntity = contexts(component).default;
    // 使用内置的组件名称 进行全局组件注册
    const { name, meta } = componentEntity;

    if (!name) throw "pages中组件名称不能为空。";

    autoImportRoutes.push({
        path: `/${name}`,
        name,
        meta: { ...meta },
        component: resolve => resolve(componentEntity)
    });
});

export const routes = [
    {
        path: "/",
        name: "home",
        // redirect: "/ImageList",
        component: resolve => require(["@views/Main"], resolve),
        children: autoImportRoutes
    }
];
