<template>
    <input type="text" :value="currentValue" @blur="onBlur" @input="onInput" />
</template>

<script>
import Emitter from "../../mixins/emitter";
export default {
    name: "iInput",
    mixins: [Emitter],
    props: {
        value: {
            type: String | Number,
            default: "",
        },
    },
    data() {
        return {
            currentValue: this.value,
        };
    },
    methods: {
        onBlur() {
            //触发校验
            this.dispatch("iFormItem", "on-form-blur", this.currentValue);
        },
        onInput(e) {
            const value = e.target.value;
            this.currentValue = value;
            this.$emit("input", value);
            //触发校验
            this.dispatch("iFormItem", "on-form-change", this.currentValue);
        },
    },
};
</script>

<style></style>
