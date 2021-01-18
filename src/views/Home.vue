<template>
    <div class="home">
        <h2>练习索引</h2>
        <ul>
            <li>
                <router-link to="/communicate">广播和派发消息</router-link>
            </li>
            <li>
                <router-link to="/formPage">表单验证</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "Home",
    components: {},
};
</script>
