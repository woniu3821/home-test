<template>
    <div class="loading">
        <Spin class="img">
            <div class="spin__box">
                <div class="dot-floating"></div>
                <div class="text">正在拼命加载中，请稍后...</div>
            </div>
        </Spin>
    </div>
</template>

<script>

// dot-elastic
// dot-pulse
// dot-flashing
// dot-collision
// dot-revolution
// dot-carousel
// dot-typing
// dot-windmill
// dot-bricks
// dot-floating
// dot-fire
// dot-spin
// dot-falling
// dot-stretching

import { mapActions } from 'vuex'

import config from '@utils/config'
export default {
    components: {},
    data () {
        return {
        };
    },
    methods: {
        ...mapActions(['getRouter']),
        redirect () {
            const defaultName = config.redirectName || this.$store.state.redirectName

            if (!defaultName) {
                this.$Notice.error({
                    title: '页面跳转失败了',
                    desc: "无有效跳转地址，请刷新网页或者联系管理员重试！"
                });
                return;
            }
            this.$router.replace({ name: defaultName })
        },
        async initRouter () {
            await this.getRouter();

            this.redirect();
        }
    },
    async mounted () {
        this.initRouter();
    }
};
</script>
<style lang="stylus">
$dot-color = #2d8cf0;
.spin__box>div[class^='dot-'], div[class^='dot-']::before, div[class^='dot-']::after {
    background: $dot-color;
    color: $dot-color;
}
</style>
<style lang="stylus" scoped >
@import ('~three-dots/dist/three-dots.css');
@keyframes identifier {
    0 {
        filter: none;
    }
    20% {
        filter: grayscale(20%);
    }
    40% {
        filter: grayscale(40%);
    }
    60% {
        filter: grayscale(60%);
    }
    80% {
        filter: grayscale(80%);
    }
    100% {
        filter: grayscale(100%);
    }
}
.loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 999;
}
.loading .img {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.text {
    margin-top: 20px;
    font-size: 16px;
    color: $dot-color;
    animation: identifier 3s infinite cubic-bezier(0.15, 0.6, 0.9, 0.1);
}
.spin__box {
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    overflow: hidden;
}
</style>
