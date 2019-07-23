
<template>
    <div class="layout">
        <!-- 头部开始 -->
        <header class="layout__header">
            <Menu
                v-model="activeName"
                mode="horizontal"
                :active-name="activeName"
                @on-select="menuChange"
            >
                <div class="header__content">
                    <!-- 左侧logo -->
                    <header-logo />
                    <!-- nav -->
                    <div class="layout-nav">
                        <nav>
                            <MenuItem
                                name="home"
                                to="/home"
                            >
                            <Icon type="ios-navigate"></Icon>
                            首页
                            </MenuItem>
                            <MenuItem
                                v-for="item in navList"
                                :key="item.id"
                                :name="item.name"
                                :to="item.path"
                                @click.native="setMenuList(item.children)"
                            >
                            <Icon :type="item.meta.icon"></Icon>
                            <span>{{item.meta.title}}</span>
                            </MenuItem>
                        </nav>
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
        <transition name="fade">
            <component
                ref="home"
                :is="currentTabComponent"
            ></component>
        </transition>
    </div>
</template>
<script>


import User from '@/components/user'
import HeaderLogo from '@components/header-logo'
import Index from '@views/Index.vue'
import Home from '@views/Home.vue'

import routers from '@/router/routers'

import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'

export default {
    components: {
        User,
        HeaderLogo,
        Index,
        Home
    },
    watch: {
        '$route' (newRoute) {
            // const { name, query, params, meta } = newRoute
            // this.addTag({
            //     route: { name, query, params, meta },
            //     type: 'push'
            // })
            this.updateActiveName(newRoute.name);
            this.setBreadCrumb(newRoute);
            this.menuChange(newRoute.name);
            //   this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
            // this.$refs.sideMenu.updateOpenName(newRoute.name)
        }
    },
    data () {
        return {
            collapsed: false,
            maxLogo: require('@assets/img/cp-logo-old.png'),
            componentName: 'Index',
            activeName: 'home',
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
            return ['home', ...this.navList.map(item => item.name)]
        },
        routerList () {
            return [...routers, ...this.menuList]
        }
    },
    methods: {
        ...mapMutations(['setHomeRoute', 'setBreadCrumb', 'setMenuList']),
        ...mapActions(['getRouter']),
        menuChange (name) {
            if (name === 'home') {
                this.componentName = 'Index'
            } else {
                this.componentName = 'Home';
                if (this.activeName === name) return;
                this.$nextTick(() => {
                    this.$refs.home.changeIframeUrl(name);
                })
            }
        },
        //更新导航名称
        updateActiveName (name) {
            //解决name值不变化不更新问题
            if (this.navListTag.includes(name)) {
                this.activeName = name;
            }
        },
        async getBasicInfo () {
            await this.$store.dispatch("index/get_basic_info")
        },
        async getSchool () {
            await this.$store.dispatch("index/get_school_info");
        },
        async getPeople () {
            await this.$store.dispatch("index/get_people_info");
        },
        async  getApp () {
            await this.$store.dispatch("index/get_app_info");
        },
        async  getGreeting () {
            await this.$store.dispatch("index/get_greeting_info");
        },

    },
    async mounted () {

        await this.getRouter();
        this.setHomeRoute(this.routerList);
        this.setBreadCrumb(this.$route);
        // this.setTagNavList()
        this.getBasicInfo();
        this.getSchool();
        this.getApp();
        this.getPeople();
        this.getGreeting();
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
        .header__content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 20px;
            .layout-nav {
                display: flex;
                align-items: center;
                nav {
                    margin-right: 20px;
                }
            }
        }
    }
}
</style>
