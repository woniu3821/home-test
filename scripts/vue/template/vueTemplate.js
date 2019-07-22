// template.js;
module.exports = {
  vueTemplate: (componentName, lower) => {
    return `<template>
  <div class="${lower}">${componentName}组件</div>
</template>
<script>
import {  } from "@api/service";
export default {
  components: {},
  name: "${componentName}",
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {}

}
</script>
<style lang="stylus" href="./main.styl" scoped></style>`;
  },
  entryTemplate: `import Main from "./main.vue";
export default Main`,
  styleTmplate: lower => {
    return `@import '~@styles/mixins.styl'
@import '~@styles/variable.styl'
.${lower}{}`;
  }
};
