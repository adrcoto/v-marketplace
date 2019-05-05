import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
//modules
import loginModal from './modules/loginModal';
import registerModal from './modules/registerModal';
// axios.defaults.headers.common.Authorization = 'Bearer ' + token


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        id: null,
        user: null,
        token: null
    },
    mutations: {
        authUser(state, userData) {
            state.id = userData.id;
            state.user = userData.user;
            state.token = userData.token;
        },
        clearAuthData(state) {
            state.token = null;
            state.name = null;
            state.id = null;

            localStorage.removeItem('id');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    },
    getters: {
        token: state => {
            return state.token;
        },
        isAuthenticated: state => {
            return state.token !== null;
        },
        user: state => {
            return state.user;
        }
    },
    actions: {
        register({commit}, authData) {
            axios.post('/register', {
                name: authData.name,
                email: authData.email,
                password: authData.password
            }).then(res => {
                localStorage.setItem('email', authData.email);
            }).catch(error => console.log(error));
        },

        login({commit}, authData) {
            axios.post('/login', {
                email: authData.email,
                password: authData.password
            }).then(res => {
                const authData = {
                    id: res.data.data.user.id,
                    user: res.data.data.user.name,
                    token: res.data.data.jwt
                };
                localStorage.setItem('id', authData.id);
                localStorage.setItem('user', authData.user);
                localStorage.setItem('token', authData.token);

                commit('authUser', authData);
            }).catch(error => console.log(error));
        },
        tryAutoLogin({commit}) {
            const token = localStorage.getItem('token');
            if (!token)
                return;
            const authData = {
                id: localStorage.getItem('id'),
                user: localStorage.getItem('user'),
                token: token
            };
            commit('authUser', authData);
        },
        logout({commit}) {
            commit('clearAuthData');
        },
        verify({commit}, authData) {
            console.log(authData.code);
            axios.post('verify', {
                email: localStorage.getItem('email'),
                code: authData.code
            }).then(res => {
                console.log(res);
            }).catch(error => console.log(error));
        }
    },
    modules: {
        loginModal,
        registerModal
    }
});
