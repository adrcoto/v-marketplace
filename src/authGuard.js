import store from './store/store';

export default (to, from, next) => {
    if (store.getters.token)
        next();
    else {
        store.dispatch('showLogin');
        next('/');
    }
}
