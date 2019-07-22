<template>
    <div class="base-pane" v-show="show" :style="contentStyle">
        <slot></slot>
    </div>
</template>
<script>
import {} from "@api/service";
import { findComponentUpward } from "@utils/assist";
export default {
    components: {},
    name: "BasePane",
    inject: ["TabsInstance"],
    props: {
        name: {
            type: String
        },
        label: {
            type: [Number, String],
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            show: true,
            currentName: this.name
        };
    },
    watch: {
        name(val) {
            this.currentName = val;
            this.updateNav();
        },
        label() {
            this.updateNav();
        },

        disabled() {
            this.updateNav();
        }
    },
    mounted() {
        this.updateNav();
    },
    destroyed() {
        this.updateNav();
    },
    computed: {
        contentStyle() {
            return {
                visibility: this.TabsInstance.activeKey !== this.currentName ? "hidden" : "visible"
            };
        }
    },
    methods: {
        updateNav() {
            this.TabsInstance.updateNav();
        }
    }
};
</script>
<style lang="stylus" scoped></style>
