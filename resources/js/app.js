require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.component('app', require('./components/App').default)

import App from "./components/App";
import Home from "./components/Home";


const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home',
    component: Home

        },

    ]
})

const app = new Vue({
    el: '#app',
    components: {App},
    router
})
