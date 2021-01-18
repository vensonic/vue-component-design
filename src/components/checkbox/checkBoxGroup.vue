<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import { findComponentsDownward } from "../../utils/assist";
import Emitter from "../../mixins/emitter";
export default {
    name: "iCheckBoxGroup",
    mixins: [Emitter],
    props: {
        value: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            currentValue: this.value,
            childrens: [],
        };
    },
    methods: {
        //找到子组件更新数据
        updateModel(update) {
            this.childrens = findComponentsDownward(this, "iCheckBox");
            if (this.childrens) {
                const { value } = this;
                this.childrens.forEach((child) => {
                    child.model = value;
                    if (update) {
                        child.currentValue = value.indexOf(child.label) >= 0;
                        child.group = true;
                    }
                });
            }
        },
        change(data) {
            this.currentValue = data;
            this.$emit("input", data);
            this.$emit("on-change", data);
            this.dispatch("iFormItem", "on-form-change", data);
        },
    },
    mounted() {
        this.updateModel(true);
    },
    watch: {
        value() {
            this.updateModel(true);
        },
    },
};
</script>

<style></style>
