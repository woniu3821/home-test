<template>
    <div>
        <Modal v-model="show" :class-name="modalClass" v-bind="$attrs" v-on="$listeners">
            <div slot="header" class="iv-header">
                <slot name="header">
                    <Icon
                        v-show="simple"
                        type="md-help-circle mr-15"
                        size="30"
                        :color="iconColor"
                    />
                    <label>{{ title }}</label>
                </slot>
            </div>
            <div :style="contentStyle">
                <slot></slot>
            </div>
            <div class="iv-footer" slot="footer">
                <slot name="footer">
                    <Button :type="okType" @click="onOk">{{ okText }}</Button>
                    <Button :type="cancelType" @click="onCancel">{{ cancelText }}</Button>
                </slot>
            </div>
        </Modal>
    </div>
</template>

<script>
/**
 * 垂直居中modal
 */
export default {
    name: "BaseModal",
    data() {
        return {
            clientH: 0
        };
    },
    props: {
        title: {
            type: String,
            default: "所需数据（数据字典）"
        },
        value: {
            type: Boolean,
            default: false
        },
        /**
         * 是否是简单弹窗
         */
        simple: {
            type: Boolean,
            default: false
        },
        type: {
            default: "info",
            validator(type) {
                const types = ["info", "warning"];
                return types.indexOf(type) > -1;
            }
        },
        okText: {
            type: String,
            default: "确定"
        },
        okType: {
            type: String,
            default: "primary"
        },
        cancelText: {
            type: String,
            default: "取消"
        },
        cancelType: {
            type: String,
            default: "default"
        }
    },
    methods: {
        onOk() {
            this.$emit("on-ok");
        },
        onCancel() {
            this.$emit("on-cancel");
        }
    },
    computed: {
        show: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            }
        },
        iconColor() {
            return this.type === "info" ? "#2d8cf0" : "#ff9900";
        },
        showClosable() {
            return !this.simple;
        },
        modalClass() {
            return this.simple ? "vertical-center-modal simple" : "vertical-center-modal";
        },
        contentStyle() {
            // body展示高度 number

            this.$nextTick(() => {
                const dom = document.documentElement || document.body;
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.clientH = dom.clientHeight;
            });

            // 弹窗内最大可用高度
            const maxInnerH = `${this.clientH - (51 + 60 + 32 + 64 + 64)}px`;
            return this.simple
                ? { minHeight: "auto", marginLeft: "45px" }
                : {
                      maxHeight: maxInnerH,
                      minHeight: "100px",
                      overflowY: "auto"
                  };
        }
    }
};
</script>

<style lang="stylus" scoped>
>>>.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
  .ivu-modal-header {
    line-height: 1.2;
  }
}
>>>.vertical-center-modal.simple {
  .ivu-modal-header {
    border-bottom: none;
  }
  .ivu-modal-footer {
    border-top: none;
  }
}
.iv-header {
  display: flex;
  align-items: center;
  ellipsis();
  label {
    font-size: 16px;
    color: #464C5B;
    font-weight: 600;
  }
}
.iv-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
