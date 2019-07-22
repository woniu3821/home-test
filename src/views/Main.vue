
<template>
    <div class="layout">
        <!-- 头部开始 -->
        <header class="layout__header">
            <Menu
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
                                name="admin"
                                to="/admin"
                            >
                            <Icon type="ios-keypad"></Icon>
                            系统设置
                            </MenuItem>
                            <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                            </MenuItem>
                            <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
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
        <transition name="slide">
            <component :is="currentTabComponent"></component>
        </transition>
    </div>
</template>
<script>


import User from '@/components/user'
import HeaderLogo from '@components/header-logo'
import Index from '@views/Index.vue'
import Home from '@views/Home.vue'

import routers from '@/router/routers'
import { mapMutations } from 'vuex'

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
            navList: ['home', 'admin']
        }
    },

    computed: {
        userAvatar () {
            return this.$store.state.user.userAvatar
        },
        unreadCount () {
            return this.$store.state.user.unreadCount
        },
        currentTabComponent () {
            return this.componentName
        }
    },

    methods: {
        ...mapMutations(['setHomeRoute', 'setBreadCrumb']),
        menuChange (name) {
            if (name === '1' || name === 'home') {
                this.componentName = 'Index'
            } else {
                this.componentName = 'Home'
            }
        },
        //更新导航名称
        updateActiveName (name) {
            //解决name值不变化不更新问题
            if (this.navList.includes(name)) {
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
        this.setHomeRoute(routers);
        this.setBreadCrumb(this.$route);
        // this.setTagNavList()
        await this.getBasicInfo();
        await this.getSchool();
        await this.getApp();
        await this.getPeople();
        await this.getGreeting();
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
