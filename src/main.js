import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import VueRouter from 'vue-router';
import store from './store/store';
import router from './router';
import Vuelidate from 'vuelidate';

import Notification from './components/notitication/Notification';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueRouter);

Vue.component('app-notification', Notification);


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created() {
        this.$store.dispatch('tryAutoLogin');
        this.$store.dispatch('loadItems');
        this.$store.dispatch('loadCategories');
        this.$store.dispatch('setDark');
    },
});