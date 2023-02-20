import { h } from "vue";
import { NIcon } from "naive-ui";
// import {BookOutline as BookIcon} from "@vicons/ionicons5";
// import router from "@/router";
export const renderIcon = (icon) => {
    return () => h(NIcon, null, { default: () => h(icon) });
};
/**
 * 递归组装菜单格式
 */
export function generatorMenu(routerMap) {
    // routerMap 按照 sort 排序
    routerMap.sort((a, b) => a.meta.sort - b.meta.sort);
    let result = routerMap.map((item) => {
        // 判断 item.name 是否在 permissions 中 如果不存在跳过
        let menu = {
            label: item?.meta?.title,
            key: item?.name,
            icon: item.meta?.icon,
        };
        if (item.children && item.children.length > 1) { // 有子元素并且长度大于1，不止一个
            menu.children = generatorMenu(item.children); // 递归
        }
        else if (item.children && item.children.length === 1) {
            menu.key = item?.children[0].name;
        }
        return menu;
    });
    // 去除result null
    return result;
}
/**
 * 判断根路由 Router
 * */
export function isRootRouter(item) {
    return item.children?.length === 1;
}
//# sourceMappingURL=index.js.map