<template>
    <label>
        <span>
            <!-- 多个复选框的用法，参考vue文档 -->
            <input
                v-if="group"
                type="checkbox"
                :disabled="disabled"
                :value="label"
                v-model="model"
                @change="onChange"
            />
            <input
                v-else
                type="checkbox"
                :disabled="disabled"
                :checked="currentValue"
                @change="onChange"
            />
        </span>
        <slot></slot>
    </label>
</template>

<script>
import Emitter from "../../mixins/emitter";
import { findComponentUpward } from "../../utils/assist.js";
export default {
    name: "iCheckBox",
    mixins: [Emitter],
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [String, Boolean, Number],
        },
        trueValue: {
            type: [String, Boolean, Number],
            default: true,
        },
        falseValue: {
            type: [String, Boolean, Number],
            default: false,
        },
        label: {
            type: [String, Number, Boolean],
        },
    },
    data() {
        return {
            currentValue: this.value,
            model: [], //多个复选框选择的值
            group: false,
            parent: null,
        };
    },
    mounted() {
        //先判断是否用了复选组
        this.parent = findComponentUpward(this, "iCheckBoxGroup");
        if (this.parent) {
            this.group = true;
        }
        if (this.group) {
            this.parent.updateModel(true);
        } else {
            this.updateModule();
        }
    },
    watch: {
        value: function(val) {
            if (val) {
                if (val === this.trueValue || val === this.falseValue) {
                    this.updateModule();
                } else {
                    throw "Value should be trueValue or falseValue.";
                }
            }
        },
    },
    methods: {
        onChange(e) {
            if (this.disabled) {
                return false;
            }
            const checked = e.target.checked;
            this.currentValue = checked;
            const value = checked ? this.trueValue : this.falseValue;
            this.$emit("input", value);
            if (this.group) {
                //如果是组合模式，就在父组件中派发表单事件
                this.parent.change(this.model);
            } else {
                this.$emit("on-change", value);
                this.dispatch("iFormItem", "on-form-change", value);
            }
        },
        updateModule() {
            this.currentValue = this.value === this.trueValue;
        },
    },
};
</script>

<style></style>
