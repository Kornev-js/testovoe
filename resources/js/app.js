require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from "vuelidate/src"


Vue.use(VueRouter)
Vue.use(Vuelidate)

Vue.component('app', require('./components/App').default)


import App from "./components/App";


const app = new Vue({
    el: '#app',
    components: {App},

})
