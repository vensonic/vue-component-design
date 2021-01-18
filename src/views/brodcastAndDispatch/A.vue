<template>
    <div>
        <h2>这是父组件A</h2>
        <p>消息:{{ this.messageFromB }}</p>
        <button @click="brodcastMsg">向下广播消息</button>
        <compB />
    </div>
</template>

<script>
import Emitter from "../../mixins/emitter";
import compB from "./B.vue";
export default {
    name: "compA",
    mixins: [Emitter],
    components: {
        compB,
    },
    data() {
        return {
            messageFromB: "",
            message: "来自父组件的消息",
        };
    },
    methods: {
        brodcastMsg() {
            this.broadCast("compB", "formA", this.message);
        },
    },
    mounted() {
        this.$on("fromB", (msg) => {
            this.messageFromB = msg;
        });
    },
};
</script>

<style></style>
