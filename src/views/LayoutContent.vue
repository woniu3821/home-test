<template>
    <div class="content">
        <iframe
            :src="iframe"
            frameborder="0"
            width="100%"
            height="100%"
            ref="iframe"
        ></iframe>
    </div>
</template>

<script>

export default {
    name: 'LayoutContent',
    data () {
        return {

        }
    },
    computed: {
        iframe () {
            return this.$store.state.url;
        }
    }
}
</script>

<style lang="stylus" scoped>
.content {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
