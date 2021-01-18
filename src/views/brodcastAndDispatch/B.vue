<template>
    <div>
        <h3>这是子组件B</h3>
        <h4>来自父组件的消息:{{ msgFormA }}</h4>
        <button @click="sendMsg">向上发送消息</button>
    </div>
</template>

<script>
import Emitter from "../../mixins/emitter";
export default {
    name: "compB",
    mixins: [Emitter],
    data() {
        return {
            message: "来自子组件的消息",
            msgFormA: "",
        };
    },
    methods: {
        sendMsg() {
            this.dispatch("compA", "fromB", this.message);
        },
    },
    mounted() {
        this.$on("formA", (msg) => {
            this.msgFormA = msg;
        });
    },
};
</script>

<style></style>
