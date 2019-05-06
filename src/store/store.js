import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import router from '../router';
//modules
import loginModal from './modules/loginModal';
import registerModal from './modules/registerModal';
// axios.defaults.headers.common.Authorization = 'Bearer ' + token

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        user: {
            id: null,
            name: null,
            email: null
        },
        loading: false,
        error: null
    },
    mutations: {
        authUser(state, userData) {
            state.token = userData.token;
            state.user.id = userData.id;
            state.user.name = userData.name;
            state.user.email = userData.email;
        },
        setUser(state, user) {
            state.user = user;
        },
        clearAuthData(state) {
            state.token = null;
            state.user.id = null;
            state.user.name = null;
            state.email = null;

            localStorage.removeItem('token');
        },
        setLoading(state, payload) {
            state.loading = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        clearError(state) {
            state.error = null;
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
        },
        loading: state => {
            return state.loading;
        },
        error: state => {
            return state.error;
        }
    },
    /**
     * Actions
     */
    actions: {
        /**
         * Register user
         * @param commit
         * @param authData
         */
        register({commit}, authData) {
            commit('setLoading', true);
            commit('clearError');

            axios.post('/register', {
                name: authData.name,
                email: authData.email,
                password: authData.password,
                url: process.env.VUE_APP_URL + '/verificare-cont'
            }).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    commit('setLoading', false);
                    console.log('Register -> Success');
                    commit('closeRegister');
                    router.push('/');
                } else {
                    console.log('Register -> Error');
                    console.log('Register -> Error -> Message: ' + response.data.errorMessage);
                    commit('setLoading', false);
                    commit('setError', response.data.errorMessage);
                }
            });
        },

        /**
         * Login user
         * @param commit
         * @param authData
         */
        login({commit}, authData) {
            // commit('setLoading', true);
            // commit('clearError');
            axios.post('/login', {
                email: authData.email,
                password: authData.password
            }).then(response => {
                // commit('setLoading', false);

                if (response && response.data && response.data.responseType === 'success') {
                    console.log('Login -> Success');
                    const authData = {
                        token: response.data.data.jwt,
                        id: response.data.data.user.id,
                        name: response.data.data.user.name,
                        email: response.data.data.user.email
                    };
                    localStorage.setItem('token', authData.token);
                    commit('authUser', authData);
                    commit('closeLogin');
                    router.push('/profil');
                } else {
                    console.log('Login -> Error');
                    console.log('Login -> Error -> Message: ' + response.data.errorMessage);
                    commit('setLoading', false);
                    commit('setError', response.data.errorMessage);
                }
            });
        },
        tryAutoLogin({commit}) {
            const token = localStorage.getItem('token');
            if (!token)
                return 0;
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            axios.get('/user').then(res => {
                commit('authUser', res.data.data);
            });
        },
        logout({commit}) {
            router.push('/');
            commit('clearAuthData');
        },
        verify({commit, state}, authData) {
            if (state.token)
                return 0;
            axios.post('verify', {
                code: authData.code
            }).then(res => {
                console.log(res.data);
            }).catch(error => console.log(error));
        }
    },
    modules: {
        loginModal,
        registerModal
    }
});
