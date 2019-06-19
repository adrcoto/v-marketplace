import store from './store/store';
// localStorage.getItem('token')
export default (to, from, next) => {
<<<<<<< HEAD

=======
>>>>>>> 5dcd1961cef038064d8be347607c00e86bbf2566
    if (sessionStorage.getItem('token'))
        next();
    else {
        next('/');
        store.dispatch('showLogin');
    }
}