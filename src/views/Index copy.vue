<template>
    <div class="page-con">
        <div
            class="con__content"
            style="min-height: 600px;"
        >
            <div class="school-sumarry">
                <div class="sumarry__basic">
                    <div class="basic__badge">
                        <img :src="badgeUrl">
                    </div>
                    <div class="basic__name">{{cSchoolInfo.schoolName}}</div>
                    <div class="basic__welcome">{{cWelcome}}</div>
                    <div class="basic__persons">
                        <div
                            class="school-person-con"
                            v-for="(person, index) in cPeopleInfo"
                            :key="index"
                        >
                            <div class="person__title">
                                {{person.title}}
                                <span class="unite">/人</span>
                            </div>
                            <div class="person__number">{{person.count}}</div>
                        </div>
                    </div>
                </div>
                <div class="summary-split"></div>
                <div class="summary__app">
                    <div
                        class="sum-app__item"
                        v-for="(app, index) in cAppInfo"
                        :key="index"
                    >
                        <div class="item__title">
                            {{app.title}}
                            <span class="unite">/个</span>
                        </div>
                        <div class="item__number">{{app.count}}</div>
                    </div>
                </div>
            </div>
            <div class="quick-entry">
                <div class="entry__title">快捷入口</div>
                <div class="entry__con">
                    <div
                        class="app-card"
                        @click="openApp(app)"
                        v-for="app in cQuickApps"
                        :key="app.appId"
                    >
                        <div class="card__icon">
                            <img
                                :src="app.appIconUrl"
                                :alt="app.appName"
                            >
                        </div>
                        <div class="card__info">
                            <div
                                class="card__title"
                                :title="app.appName"
                            >{{app.appName}}</div>
                            <div
                                class="card__desc"
                                :title="app.appName"
                            >{{app.description}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="con__footer">
        @1998 - 2018 wisedu All Right Reserved
    </div>-->
    </div>
</template>

<script>
export default {
    components: {},
    data () {
        return {
            personList: [
                {
                    title: "教职工",
                    number: 1245
                },
                {
                    title: "学生",
                    number: 25684
                },
                {
                    title: "校友",
                    number: 8761
                }
            ]
        };
    },
    computed: {
        badgeUrl () {
            return this.cSchoolInfo.badgeUrl || require("@assets/img/empty.png");
        },
        cWelcome () {
            return this.$store.state.greeting;
        },
        cSchoolInfo () {
            return this.$store.state.schoolInfo;
        },
        cAppInfo () {
            return this.$store.state.appInfo;
        },
        cPeopleInfo () {
            return this.$store.state.peopleInfo;
        },
        cQuickApps () {
            return this.$store.state.quickApps;
        }
    },
    methods: {
        openApp (app) {
            window.open(app.entranceUrl);
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

    mounted () {

        this.getBasicInfo();
        this.getSchool();
        this.getApp();
        this.getPeople();
        this.getGreeting();
    }
};
</script>

<style lang="stylus" scoped >
.basic__name, .card__desc {
    clamp(2);
}
.page-con {
    padding: 20px 35px;
    min-height: calc(100vh - 64px);
    .con__content {
        background: #ffffff;
        box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.05), -2px -2px 4px 0 rgba(0, 0, 0, 0.05);
        min-height: calc(100vh - 104px);
        padding: 20px;
        .school-sumarry {
            width: 300px;
            float: left;
            padding: 30px;
            border-right: 1px solid #e9eaec;
            .sumarry__basic {
                // border-bottom: 1px solid #E9EAEC;
                text-align: center;
                .basic__badge {
                    margin-top: 50px;
                    height: 100px;
                    img {
                        width: 84px;
                        height: 84px;
                    }
                }
                .basic__name {
                    line-height: 2em;
                    font-size: 16px;
                    font-weight: bold;
                }
                .basic__welcome {
                    line-height: 2em;
                    font-size: 14px;
                    color: #2d8cf0;
                }
                .basic__persons {
                    margin-top: 30px;
                    margin-bottom: 10px;
                    .school-person-con {
                        text-align: left;
                        width: 30%;
                        font-size: 14px;
                        color: #464c5b;
                        display: inline-block;
                        .person__number {
                            color: #2d8cf0;
                            font-size: 16px;
                            line-height: 2em;
                        }
                    }
                }
            }
            .summary-split {
                height: 1px;
                background-color: #e9eaec;
            }
            .summary__app {
                margin-top: 30px;
                .sum-app__item {
                    // text-align: center;
                    height: 80px;
                    width: 50%;
                    display: inline-block;
                    .item__title {
                        font-size: 14px;
                        color: #464c5b;
                    }
                    .item__number {
                        color: #2d8cf0;
                        font-size: 30px;
                    }
                }
            }
            .unite {
                font-size: 12px;
                color: #657180;
            }
        }
        .quick-entry {
            margin-left: 300px;
            padding: 10px 0 10px 30px;
            .entry__title {
                font-size: 16px;
                font-weight: bold;
            }
            .entry__con {
                margin-top: 20px;
                .app-card {
                    display: inline-block;
                    width: 260px;
                    height: 104px;
                    box-shadow: none;
                    border: 1px solid #e9eaec;
                    transition: all 0.8s;
                    border-radius: 6px;
                    padding: 20px;
                    margin-right: 20px;
                    margin-bottom: 20px;
                    cursor: pointer;
                    &:hover {
                        border: 1px solid #2d8cf0;
                        box-shadow: 0 15px 20px -8px rgba(147, 176, 239, 0.33);
                    }
                    .card__icon {
                        float: left;
                        width: 64px;
                        height: 64px;
                        text-align: center;
                        background-color: #f3f3f3;
                        border-radius: 5px;
                        img {
                            width: 64px;
                            height: 64px;
                        }
                    }
                    .card__info {
                        margin-left: 64px;
                        padding-left: 10px;
                        .card__title {
                            font-weight: bold;
                            font-size: 15px;
                            color: #464c5b;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            word-wrap: break-word;
                        }
                        .card__desc {
                            font-size: 13px;
                            color: #657180;
                            height: 36px;
                        }
                    }
                }
            }
        }
    }
}
</style>
