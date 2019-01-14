<!--单文件组件  推荐-->
<template>
    <div id="app">
        <h1>{{msg}}</h1>
        <img src="./img/favicon.ico" />
        <input type="text" v-model="msg"/>
    </div>
</template>
<script>
    import getData from './util';
    export default {
        name: 'app',
        data(){
            return {
                msg: 'welcome to your vue.js!'
            }
        },
        created(){
            this.fetchData();
            console.log('hello, vue!')
        },
        methods: {
            async fetchData(){
                const data = await getData();
                this.msg = data;
            }
        }
    }
</script>
