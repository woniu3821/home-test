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
    .router-link-exact-active {
        color: #1873e0;
    }
}
</style>
