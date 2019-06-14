import store from './store/store';
// localStorage.getItem('token')
export default (to, from, next) => {
    if (sessionStorage.getItem('token'))
        next();
    else {
        next('/');
        store.dispatch('showLogin');
    }
}