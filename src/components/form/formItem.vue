<template>
    <div>
        <label v-if="label" :class="{ 'is-required': isRequired }">{{
            label
        }}</label>
        <div>
            <slot></slot>
        </div>
        <div class="error-message" v-if="validateState === 'error'">
            {{ valitdateMessage }}
        </div>
    </div>
</template>

<script>
import Emitter from "../../mixins/emitter";
import AsyncValidator from "async-validator";
export default {
    name: "iFormItem",
    mixins: [Emitter],
    //接收form
    inject: ["form"],
    props: {
        label: {
            type: String,
            default: "",
        },
        prop: {
            type: String,
        },
    },
    data() {
        return {
            isRequired: false,
            initValue: "", //保存初值，用于重置
            validateState: "", //校验状态
            valitdateMessage: "", //校验提示信息
        };
    },
    computed: {
        fieldValue() {
            return this.form.model[this.prop];
        },
    },
    methods: {
        //设置规则
        setRules() {
            //判断是否必填
            let rules = this.form.rules[this.prop];
            if (rules && rules.length) {
                rules.every((rule) => {
                    this.isRequired = rule.required;
                });
            }
            //触发校验
            this.$on("on-form-blur", () => {
                this.validate("blur");
            });
            this.$on("on-form-change", () => {
                this.validate("change");
            });
        },
        //收集校验
        getRules(trigger) {
            let rules = this.form.rules[this.prop];
            if (!rules || !rules.length) {
                return [];
            }
            // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
            return rules.filter(
                (rule) => rule.trigger && rule.trigger.indexOf(trigger) !== -1
            );
        },
        //校验
        validate(trigger, callBack = function() {}) {
            //先拿到规则
            let rules = this.getRules(trigger);
            if (!rules || !rules.length) {
                return true;
            }
            this.validateState = "validating";
            let descriptor = {
                [this.prop]: rules,
            };
            const validator = new AsyncValidator(descriptor);
            let value = {
                [this.prop]: this.fieldValue,
            };
            validator.validate(value, (errors, fields) => {
                this.validateState = errors ? "error" : "success";
                this.valitdateMessage = errors ? errors[0].message : "";
                callBack(this.valitdateMessage);
            });
        },
        //重置
        resetField() {
            this.validateState = "";
            this.valitdateMessage = "";
            this.form.model[this.prop] = this.initValue;
        },
    },
    mounted() {
        //实例存储到form中
        if (this.prop) {
            // 如果没有传入 prop，则无需校验，也就无需缓存
            this.dispatch("iForm", "formItemAdd", this);
            this.initValue = this.fieldValue;
            this.setRules();
        }
    },

    beforeDestroy() {
        //销毁前移除
        this.dispatch("iForm", "formItemRemove", this);
    },
};
</script>

<style lang="less">
.is-required::before {
    content: "*";
    color: red;
}
.error-message {
    color: red;
}
</style>
