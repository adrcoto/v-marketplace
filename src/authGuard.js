import store from './store/store';
// localStorage.getItem('token')
export default (to, from, next) => {
    if (localStorage.getItem('token'))
        next();
    else {
        next('/');
        store.dispatch('showLogin');
    }

}
