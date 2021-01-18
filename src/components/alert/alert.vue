<template>
    <div class="alert">
        <div class="alert-main" v-for="item in notices" :key="item.name">
            <div class="alert-content">{{ item.content }}</div>
        </div>
    </div>
</template>
<script>
let seed = 0;
function getUuid() {
    return "alert_" + seed++;
}
export default {
    data() {
        return {
            //通知可以是多个，用一个数组存起来
            notices: [],
        };
    },
    methods: {
        //将通知存入消息队列
        add(notice) {
            //用不重名的名字来标识每条消息
            const name = getUuid();
            let _notice = Object.assign(
                {
                    name: name,
                },
                notice
            );

            this.notices.push(_notice);
            // 定时移除，单位：秒
            const duration = notice.duration;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.remove(name);
                    resolve();
                }, duration * 1000);
            });
        },
        //从消息队列移除
        remove(name) {
            const notices = this.notices;
            for (let i = 0; i < notices.length; i++) {
                if (notices[i].name === name) {
                    this.notices.splice(i, 1);
                    break;
                }
            }
        },
    },
};
</script>
<style>
.alert {
    position: fixed;
    width: 100%;
    top: 16px;
    left: 0;
    text-align: center;
    pointer-events: none;
}
.alert-content {
    display: inline-block;
    padding: 8px 16px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    margin-bottom: 8px;
}
</style>
