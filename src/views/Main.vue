
<template>
    <div class="layout">
        <!-- 头部开始 -->
        <header class="layout__header">
            <Menu
                mode="horizontal"
                :active-name="activeName"
            >
                <div class="header__content">
                    <!-- 左侧logo -->
                    <header-logo />
                    <!-- nav -->
                    <div class="layout-nav">
                        <nav>
                            <!-- <MenuItem
                                name="home"
                                to="/home"
                                @click.native="menuChange('home')"
                            >
                            <Icon type="ios-navigate"></Icon>
                            首页
                            </MenuItem> -->
                            <MenuItem
                                v-for="item in navList"
                                :key="item.id"
                                :name="item.id"
                                :to="item.path"
                            >
                            <Icon :type="item.meta.icon"></Icon>
                            <span>{{item.meta.title}}</span>
                            </MenuItem>
                        </nav>
                        <!-- <fullscreen
                            v-model="isFullscreen"
                            style="margin-right: 10px;"
                        /> -->
                        <!-- 用户信息 -->
                        <user
                            :message-unread-count="unreadCount"
                            :user-avatar="userAvatar"
                        />
                    </div>
                </div>

            </Menu>
        </header>
        <!-- 头部结束 -->
        <div class="layout__body">
            <transition name="fade">
                <component
                    ref="home"
                    :is="currentTabComponent"
                ></component>
            </transition>
        </div>
    </div>
</template>
<script>


import User from '@/components/user'
import HeaderLogo from '@components/header-logo'
import Index from '@views/Index.vue'
import Home from '@views/Home.vue'
import LayoutContent from "@views/LayoutContent.vue"
import fullscreen from '@/components/fullscreen'
import routers from '@/router/routers'

import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'

export default {
    components: {
        User,
        HeaderLogo,
        Index,
        Home,
        LayoutContent,
        fullscreen
    },
    watch: {
        '$route' (newRoute) {
            const { name, query, params, meta } = newRoute
            // this.addTag({
            //     route: { name, query, params, meta },
            //     type: 'push'
            // })

            // } else {
            //路由改变时候切换页面
            this.$nextTick(() => {

                this.menuChange(name);

                this.setMenuList(newRoute);

                this.updateActiveName(name);


                this.setBreadCrumb(newRoute);

                setTimeout(() => {
                    if (typeof this.$refs.home.changeIframeUrl !== 'function') return;
                    this.$refs.home.changeIframeUrl(name);
                    this.setActiveName(name);
                    this.$refs.home.updateOpenName(name);
                })
            })
            // }

            //   this.setTagNavList(getNewTagList(this.tagNavList, newRoute))

        }
    },
    data () {
        return {
            collapsed: false,
            maxLogo: require('@assets/img/cp-logo-old.png'),
            componentName: 'Index',
            activeName: 'home',
            showContent: false,
            isFullscreen: false,
        }
    },
    computed: {
        ...mapState(['menuList']),
        ...mapGetters(['navList']),
        userAvatar () {
            return this.$store.state.user.userAvatar
        },
        unreadCount () {
            return this.$store.state.user.unreadCount
        },
        currentTabComponent () {
            return this.componentName
        },
        navListTag () {
            return this.navList.map(item => item.id)
            // return ['home', ...this.navList.map(item => item.id)]
        },
        routerList () {
            return [...routers, ...this.menuList]
        }
    },
    methods: {
        ...mapMutations(['setHomeRoute', 'setBreadCrumb', 'setMenuList', 'setActiveName']),
        ...mapActions(['getRouter']),
        menuChange (name) {
            let parent = this.navList.find(it => it.name === name)
            if (parent) {
                this.showContent = !parent.meta.hasChild;
            } else {
                this.showContent = false;
            }
            //非首页切换到有导航的页面
            if (name === 'home') {
                this.componentName = 'Index'
            } else if (this.showContent) {
                this.componentName = 'LayoutContent';
            } else {
                this.componentName = 'Home';
            }
        },

        //更新导航名称
        updateActiveName () {
            this.activeName = this.$store.state.navActiveName;
        },
    },
    async mounted () {


        this.setHomeRoute(this.routerList);
        this.setBreadCrumb(this.$route);
        // this.setTagNavList()

    }
}
</script>

<style scoped lang="stylus">
.layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f6f8fb;
    overflow: hidden;
    .layout__header {
        height: 60px;
        .header__content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 20px;
            flex-wrap: nowrap;
            .layout-nav {
                display: flex;
                align-items: center;
                nav {
                    margin-right: 20px;
                }
            }
        }
    }
    .layout__body {
        flex-grow: 1;
        // overflow-y: auto;
    }
}
</style>
