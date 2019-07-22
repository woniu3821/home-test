<template>
    <div class="layout__container">
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
                    accordion
                    ref="sideMenu"
                    :active-name="$route.name"
                    :collapsed="collapsed"
                    @on-select="turnToPage"
                    :menu-list="menuList"
                >
                    <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
                </side-menu>
            </Sider>
        </aside>
        <div class="container__content">
            <div class="content__bread">
                <header-bar :collapsed="collapsed"></header-bar>
            </div>
            <div class="content__mian">
                <keep-alive :include="cacheList">
                    <iframe
                        :src="iframe"
                        frameborder="0"
                        width="100%"
                        height="100%"
                        ref="iframe"
                    ></iframe>
                </keep-alive>
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

        };
    },

    computed: {
        tagNavList () {
            return this.$store.state.tagNavList
        },
        menuList () {
            return this.$store.getters.menuList
        },
        cacheList () {
            const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
            return list
        },
        iframe () {
            return 'http://wecamp.wisedu.com/wec-smmp-sinfo/systemSetting/index.html'
        }
    },
    methods: {

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
            })
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

        }
    },
    mounted () {
        this.listenIframeLoad();
    }

}
</script>
<style lang="stylus" scoped>
.layout__container {
    flex-grow: 1;
    display: flex;
    align-items: stretch;
    .container__aside {
        background: #011529;
        flex-shrink: 0;
    }
    .container__content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 61px);
        overflow: hidden;
        .content__bread {
            padding: 10px 0;
        }
        .content__mian {
            margin: 0 10px 10px;
            flex-grow: 1;
            background: #fff;
            padding: 10px;
            border-radius: 5px;
            overflow-y: auto;
            box-sizing: border-box;
        }
    }
}
</style>
