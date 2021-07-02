require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

Vue.component('app', require('./components/App').default)




import App from "./components/App";



const app = new Vue({
    el: '#app',
    components: {App},

})
