<template>
    <div class="img-preview">
        <transition name="fade">
            <div @click="toggle" v-show="show" class="img-bg">
                <div class="top active">
                    <div class="title">{{ title }}</div>
                </div>
                <div class="content">
                    <img :src="src" alt />
                </div>
                <div class="bottom"></div>
            </div>
        </transition>
    </div>
</template>
<script>
/**
 * 图片预览组件
 */
import {} from "@api/service";

export default {
    components: {},
    name: "ImgPreview",
    props: {
        value: Boolean,
        src: String,
        title: String
    },
    data() {
        return {};
    },
    computed: {
        show: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            }
        }
    },
    methods: {
        toggle() {
            this.show = !this.show;
        }
    }
};
</script>
<style lang="stylus" scoped>
@import '~@styles/mixins.styl'
@import '~@styles/variable.styl'

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.img-preview {
  user-select: none
  .img-bg {
    z-index: 1000
    position: fixed
    width: 100vw
    height: 100vh
    top: 0
    left: 0
    right: 0
    left: 0
    opacity: 0
    background: rgba(0, 0, 0, 0.7)
    opacity: 1
  }
  .top {
    position: absolute
    top: 0
    width: 100vw
    height: 70px
    background: rgba(0, 0, 0, 0.7)
    display: flex
    align-items: center
    transform: translate3d(0, -70px, 0)
    transition: all 0.3s ease-out
    .title {
      margin-left: 60px
      font-size: 20px
      font-weight: 600
      color: #fff
      ellipsis()
    }
  }
  .bottom {
    position: absolute
    bottom: 0
    width: 100vw
    height: 70px
    background: rgba(0, 0, 0, 0.7)
    display: flex
    align-items: center
    visibility: hidden
  }
  .top.active {
    transform: translate3d(0, 0, 0)
  }
  .content {
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    img {
      max-width: calc(100% - 80px)
      max-height: calc(100% - 80px)
    }
  }
}
</style>
