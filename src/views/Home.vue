<template>
    <div class="layout__container">
        <div class="aside">
            <aside class="container__aside">
                <Sider
                    collapsible
                    :width="256"
                    :collapsed-width="64"
                    v-model="collapsed"
                    class="left-sider"
                    :style="{overflow: 'hidden'}"
                >
                    <side-menu
                        :accordion="false"
                        ref="sideMenu"
                        :active-name="activeLeftName"
                        :collapsed="collapsed"
                        @on-select="turnToPage"
                        :menu-list="menuList"
                    >
                        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
                    </side-menu>
                </Sider>
            </aside>
        </div>
        <div class="container__content">
            <div class="content__bread">
                <header-bar :collapsed="collapsed"></header-bar>
            </div>
            <div class="content__mian">
                <!-- <keep-alive :include="cacheList"> -->
                <iframe
                    :src="iframe"
                    frameborder="0"
                    width="100%"
                    height="100%"
                    ref="iframe"
                ></iframe>
                <!-- </keep-alive> -->
            </div>
        </div>
    </div>
</template>
<script>
import SideMenu from '@/components/side-menu';
import HeaderBar from '@/components/header-bar'

import { } from "@api/service";
export default {
    components: {
        SideMenu,
        HeaderBar,

    },
    name: "Home",
    props: {},
    data () {
        return {
            collapsed: false,
            iframe: '',
        };
    },
    computed: {
        activeLeftName () {
            return this.$store.state.activeName;
        },
        tagNavList () {
            return this.$store.state.tagNavList
        },
        menuList () {
            return this.$store.getters.menuList
        },
        cacheList () {
            const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
            return list
        }
    },
    methods: {
        updateOpenName (name) {
            this.$refs.sideMenu.updateOpenName(name);
        },
        turnToPage (route) {

            let { name, params, query } = {}
            if (typeof route === 'string') name = route
            else {
                name = route.name
                params = route.params
                query = route.query
            }

            if (name.indexOf('isTurnByHref_') > -1) {
                window.open(name.split('_')[1])
                return
            }
            this.$router.push({
                name,
                params,
                query
            });

        },
        listenIframeLoad () {
            this.$nextTick(() => {
                const iframe = this.$refs.iframe;
                if (iframe.attachEvent) {
                    iframe.attachEvent("onload", function () {
                        console.log("Local iframe is now loaded.");
                    });
                } else {
                    iframe.onload = function () {
                        console.log("Local iframe is now loaded.");
                    };
                }
            })

        },
        changeIframeUrl (name) {
            //递归寻找url
            let url = '';
            let findUrl = (data, name) => {
                for (let item of data) {
                    if (item.name === name && item.meta.url !== '') {
                        url = item.meta.url;
                        break;
                    } else if (item.children) {
                        findUrl(item.children, name)
                    } else {
                        continue;
                    }
                }
                return url;
            }
            let urls = findUrl(this.menuList, name);
            if (url) {
                this.iframe = urls;
            }
        }
    },
    mounted () {
        // this.listenIframeLoad();
    }

}
</script>
<style lang="stylus" scoped>
.layout__container {
    flex-grow: 1;
    display: flex;
    align-items: stretch;
    .aside {
        height: calc(100vh - 108px);
        overflow: hidden;
    }
    .container__aside {
        background: #011529;
        flex-shrink: 0;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .container__aside::-webkit-scrollbar {
        width: 0;
    }
    .container__content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 60px);
        overflow: hidden;
        .content__bread {
            padding: 10px 0;
        }
        .content__mian {
            flex-grow: 1;
            overflow-x: auto;
            height: 100%;
            background: #fff;
            // overflow: hidden;
        }
    }
}
</style>
