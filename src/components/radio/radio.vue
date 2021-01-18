<template>
    <label>
        <input
            type="radio"
            :value="label"
            v-model="currentValue"
            @change="onChange"
        />
        <slot></slot>
    </label>
</template>

<script>
import Emitter from "../../mixins/emitter";
import { findComponentUpward } from "../../utils/assist.js";
export default {
    name: "iRadio",
    mixins: [Emitter],
    props: {
        value: {
            type: [String, Number, Boolean],
        },
        label: {
            type: [String, Number, Boolean],
        },
    },
    data() {
        return {
            currentValue: this.value,
            group: false,
            parent: null,
        };
    },
    watch: {
        value: function(val) {
            this.updateModule();
        },
    },
    mounted() {
        this.parent = findComponentUpward(this, "iRadioGroup");
        if (this.parent) {
            this.group = true;
            this.parent.updateModel();
        }
    },
    methods: {
        onChange(e) {
            const value = e.target.value;
            if (this.group) {
                this.parent.change(value);
            } else {
                this.$emit("input", value);
                this.dispatch("iFormItem", "on-form-change", value);
            }
        },
        updateModule() {
            this.currentValue = this.value;
        },
    },
};
</script>

<style></style>
