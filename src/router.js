import Home from './views/Home';
import About from './views/About';

import Verify from './components/auth/Verify';

import CreateItem from './components/item/CreateItem';

import Profile from './components/user/Profile';

import authGuard from './authGuard';

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/verificare-cont',
        name: 'Verify',
        component: Verify
    },
    {
        path: '/anunt/nou',
        name: 'Create Ite,',
        component: CreateItem,
        beforeEnter: authGuard
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        beforeEnter: authGuard
    }
];
