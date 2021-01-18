<template>
    <div>
        <h2>表单验证</h2>
        <i-form :model="form" :rules="rules" ref="form">
            <i-form-item label="姓名" prop="name">
                <i-input v-model="form.name" />
            </i-form-item>
            <i-form-item label="年龄" prop="age">
                <i-input v-model="form.age" />
            </i-form-item>
            <i-form-item label="性别" prop="gender">
                <i-radio-group v-model="form.gender">
                    <i-radio label="1">男</i-radio>
                    <i-radio label="2">女</i-radio>
                    <i-radio label="3">外星人</i-radio>
                </i-radio-group>
            </i-form-item>
            <i-form-item label="爱好" prop="like">
                <i-check-box-group v-model="form.like">
                    <i-check-box label="1">吃饭</i-check-box>
                    <i-check-box label="2">睡觉</i-check-box>
                    <i-check-box label="3">打豆豆</i-check-box>
                </i-check-box-group>
            </i-form-item>
        </i-form>
        <button @click="submit">提交</button>
    </div>
</template>

<script>
import iRadio from "../components/radio/radio.vue";
import iRadioGroup from "../components/radio/radioGroup.vue";
import iCheckBox from "../components/checkbox/checkBox.vue";
import iCheckBoxGroup from "../components/checkbox/checkBoxGroup.vue";
import iInput from "../components/input/input.vue";
import iFormItem from "../components/form/formItem.vue";
import iForm from "../components/form/form.vue";
export default {
    name: "formPage",
    components: {
        iRadio,
        iRadioGroup,
        iCheckBox,
        iCheckBoxGroup,
        iInput,
        iFormItem,
        iForm,
    },
    data() {
        return {
            form: {
                name: "",
                age: "",
                gender: "",
                like: ["1", "2"],
            },
            rules: {
                name: [
                    { required: true, message: "不能为空", trigger: "blur" },
                ],
                age: [{ required: true, message: "不能为空", trigger: "blur" }],
                gender: [
                    { required: true, message: "不能为空", trigger: "change" },
                ],
                like: [
                    {
                        type: "array",
                        required: true,
                        message: "不能为空",
                        trigger: "change",
                        validator: (rule, value) => value.length > 0,
                    },
                ],
            },
        };
    },

    methods: {
        submit() {
            this.$refs.form
                .validate()
                .then(() => {
                    this.$Alert.info({ content: "校验通过了" });
                    console.log(this.form);
                })
                .catch(() => {
                    this.$Alert.info({ content: "校验未通过" }).then(() => {
                        alert("提示关闭了");
                    });
                });
        },
    },
};
</script>

<style></style>
