<template>
    <div class="base-empty">
        <div class="content" :style="styles">
            <img :src="img" />
            <p class="title">{{ title }}</p>
            <div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
import {} from "@api/service";

export default {
    components: {},
    name: "BaseEmpty",
    props: {
        title: String,
        height: {
            type: Number,
            default: 500
        }
    },
    data() {
        return {
            img: require("@assets/img/empty.png")
        };
    },
    computed: {
        styles() {
            return { minHeight: `${this.height}px` };
        }
    },
    methods: {},
    mounted() {}
};
</script>
<style lang="stylus" scoped>
@import '~@styles/mixins.styl'
@import '~@styles/variable.styl'
.base-empty {
  min-height 350px
  .content {
    display flex
    align-items center
    justify-content center
    flex-direction column
    .title {
      color $base-color
      font-size 16px
      text-align center
      margin 20px 0
    }
  }
}
</style>
