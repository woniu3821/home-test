<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>

export default {
    methods: {

    },
    // async mounted () {
    //     await this.getRouter();
    // }
}
</script>

<style lang="stylus" scoped>
#app {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow-y: auto;
    .router-link-exact-active {
        color: #1873e0;
    }
}
</style>
