<template>
    <div class="base-table ivu-table-wrapper" v-if="checkData">
        <div class="ivu-table ivu-table-default ivu-table-border">
            <table class="iv-table" cellspacing="0" cellpadding="0" border="0">
                <tbody class="ivu-table-tbody">
                    <tr class="ivu-table-row" v-for="(tr, index) in this.tableData" :key="index">
                        <template v-for="(td, index) in tr">
                            <th :key="'tr' + index">
                                <div class="ivu-table-cell">{{ td.name }}</div>
                            </th>
                            <td :key="'td' + index">
                                <div class="ivu-table-cell">{{ td.value }}</div>
                            </td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { chunk } from "@utils";

export default {
    components: {},
    name: "BasePanele",
    props: {
        /**
         * 表格数据
         * [{name:名称,value:数据}]
         */
        model: {
            type: Array,
            default: () => []
        },
        /**
         * 每行显示列数
         */
        row: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {};
    },
    computed: {
        tableData() {
            return chunk(this.model, this.row);
        },
        checkData() {
            if (this.model.length % this.row === 0) {
                return true;
            }
            this.$Message.error("非法表格数据！");
            return false;
        }
    },
    methods: {},
    mounted() {}
};
</script>
<style lang="stylus" scoped>
@import '~@styles/mixins.styl'
@import '~@styles/variable.styl'

.base-table {
  .iv-table {
    width: 100%
    box-sizing: border-box
  }
}
</style>
