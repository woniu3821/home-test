<template>
    <ul>
        <li v-for="item in model" :key="item.name">
            <router-link :to="item" exact>{{ item.meta.name }}</router-link>
        </li>
        <slot></slot>
    </ul>
</template>
<script>
export default {
    name: "NavBar",
    props: {
        model: {
            required: true,
            type: Array,
            default: function() {
                return [];
            }
        }
    }
};
</script>
<style lang="stylus" scoped>
ul {
    padding-bottom: 17px;
}
li {
    display: inline-block;
    font-size: 14px;
    margin-right: 7px;
    a {
        color: #969696;
        font-weight: 400;
    }
    &::after {
        content: '>';
        color: #666;
        margin-left: 7px;
        font-weight: 400;
    }
    &:last-child {
        margin-right: 7px;
        a {
            color: #666;
        }
        &::after {
            content: '';
            display: none;
        }
    }
    & > a:not(.router-link-exact-active):hover {
        color: @link-text-color;
    }
}
.router-link-exact-active {
    color: @aColor;
}
</style>
