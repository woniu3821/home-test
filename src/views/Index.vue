<template>
    <div class="loading">
        <Spin class="img">
            <div class="spin__box">
                <div class="dot-floating"></div>
                <!-- <div class="text">加载中</div> -->
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

export default {
    components: {},
    data () {
        return {
        };
    },

    methods: {
        ...mapActions(['getRouter']),

    },

    async mounted () {

        await this.getRouter();

        this.$router.replace({ name: 'appmgr' })

    }
};
</script>

<style lang="stylus" scoped >
@import ('~three-dots/dist/three-dots.css');
.loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
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
    margin-top: 10px;
    font-size: 16px;
    color: #fff;
}
.spin__box {
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    overflow: hidden;
}
</style>
