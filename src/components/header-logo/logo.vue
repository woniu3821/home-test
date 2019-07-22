<template>
    <div class="logo">
        <img
            :src="logoUrl"
            :alt="schoolName"
        >
        <div class="schoolName ml-10">{{schoolName}}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'HeaderLogo',
    data () {
        return {

        }
    },
    computed: {
        ...mapState(['logoUrl', 'schoolName'])
    }
}
</script>

<style lang="stylus" scoped>
.logo {
    display: flex;
    align-items: center;
    img {
        height: 44px;
        width: auto;
        display: block;
        margin: 0 auto;
    }
    .schoolName {
        font-size: 20px;
        color: #657180;
        font-weight: 900;
    }
}
</style>
