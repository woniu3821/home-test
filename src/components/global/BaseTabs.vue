<template>
    <div class="base-tabs">
        <div class="tabs">
            <div
                v-for="(tab, index) in navList"
                :key="index"
                :class="['tab-item', activeKey === index ? 'active' : '']"
                @click="tabChange(index)"
            >
                {{ tab.label }}
            </div>
        </div>
        <div ref="panes">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import {} from "@api/service";
import { findComponentsDownward } from "@utils/assist";
export default {
    components: {},
    name: "BaseTabs",
    provide() {
        return { TabsInstance: this };
    },
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            navList: [],
            activeKey: this.value
        };
    },
    watch: {
        value(val) {
            this.activeKey = val;
        },
        activeKey(val) {
            this.updateStatus();
            // update visibility
            const nextIndex = Math.max(this.getTabIndex(val), 0);
            this.updateVisibility(nextIndex);
        }
    },
    methods: {
        getTabIndex(name) {
            return this.navList.findIndex(nav => nav.name === name);
        },
        getTabs() {
            // return this.$children.filter(item => item.$options.name === 'TabPane');
            const AllTabPanes = findComponentsDownward(this, "BasePane");
            const TabPanes = [];

            AllTabPanes.forEach(item => {
                if (item.tab && this.name) {
                    if (item.tab === this.name) {
                        TabPanes.push(item);
                    }
                } else {
                    TabPanes.push(item);
                }
            });

            // 在 TabPane 使用 v-if 时，并不会按照预先的顺序渲染，这时可设置 index，并从小到大排序
            TabPanes.sort((a, b) => {
                if (a.index && b.index) {
                    return a.index > b.index ? 1 : -1;
                }
            });
            return TabPanes;
        },
        updateNav() {
            this.navList = [];
            this.getTabs().forEach((pane, index) => {
                this.navList.push({
                    labelType: typeof pane.label,
                    label: pane.label,
                    icon: pane.icon || "",
                    name: pane.currentName || index,
                    disabled: pane.disabled
                });
                if (!pane.currentName) pane.currentName = index;
                if (index === 0) {
                    if (!this.activeKey) this.activeKey = pane.currentName || index;
                }
            });
            this.updateStatus();
        },
        updateVisibility(index) {
            [...this.$refs.panes.querySelectorAll(`.base-pane`)].forEach((el, i) => {
                if (index === i) {
                    [...el.children]
                        .filter(child => child.classList.contains(`.base-pane`))
                        .forEach(child => (child.style.visibility = "visible"));
                } else {
                    [...el.children]
                        .filter(child => child.classList.contains(`.base-pane`))
                        .forEach(child => (child.style.visibility = "hidden"));
                }
            });
        },
        updateStatus() {
            const tabs = this.getTabs();
            tabs.forEach(tab => (tab.show = tab.currentName === this.activeKey || this.animated));
        },
        tabChange(index) {
            const nav = this.navList[index];
            if (nav.disabled) return;
            this.activeKey = nav.name;
            this.$emit("input", nav.name);
            this.$emit("on-click", nav.name);
            this.updateStatus();
            this.updateVisibility(index);
        }
    },
    mounted() {
        this.updateVisibility(this.getTabIndex(this.activeKey));
    }
};
</script>
<style lang="stylus" scoped>
.base-tabs {
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid $grey-v1;
    border-radius: 4px;
    .tabs {
        display: flex;
        border-bottom: 1px solid $grey-v1;
        font-size: 16px;
        height: 41px;
        line-height: 31px;
        background: #F5F7FA;
        .tab-item {
            border-radius: 4px 4px 0 0;
            cursor: pointer;
            font-size: 14px;
            height: 41px;
            line-height: 41px;
            padding: 0 10px;
            text-align: center;
            line-height: 40px;
            transition: background 0.3s;
            border-right: 1px solid $grey-v1;
        }
        .tab-item:hover {
            background: $grey-v1;
        }
        .tab-item:last-child {
            border-right: none;
        }
        .tab-item.active {
            color: $primary-color;
            background: #fff;
            border-right: 1px solid $grey-v1;
        }
        .tab-item.active:hover {
            background: $grey-v1;
        }
    }
}
</style>
