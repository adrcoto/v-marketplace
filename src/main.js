import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import VueRouter from 'vue-router';
import store from './store/store';
import router from './router';
import Vuelidate from 'vuelidate';

import Alert from './components/modal/shared/Alert'

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueRouter);

Vue.component('app-alert', Alert);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
