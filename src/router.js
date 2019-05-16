import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home';
import About from './views/About';
import Verify from './components/auth/Verify';
import CreateItem from './components/item/CreateItem';
import Profile from './components/user/Profile';

import authGuard from './authGuard';

Vue.use(Router);

export default new Router({

    routes: [{
        path: '/',
        name: 'Home',
        component: Home
    },
        {
            path: '/despre',
            name: 'About',
            component: About
        },
        {
            path: '/verificare-cont/:code',
            name: 'Verify',
            component: Verify
        },
        {
            path: '/anunt/nou',
            name: 'Create Item',
            component: CreateItem,
            beforeEnter: authGuard
        },
        {
            path: '/profil',
            name: 'Profile',
            component: Profile,
            beforeEnter: authGuard
        }
    ],
    mode: 'history'
});
