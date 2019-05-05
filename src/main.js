import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import VueRouter from 'vue-router';
import store from './store/store';
import {routes} from './router';
import Vuelidate from 'vuelidate';


Vue.config.productionTip = false;

const router = new VueRouter({
    mode: 'history',
    routes
});

Vue.use(Vuelidate);
Vue.use(VueRouter);
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
