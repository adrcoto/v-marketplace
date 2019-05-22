import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import router from '../router';
//modules
import loginModal from './modules/loginModal';
import registerModal from './modules/registerModal';
import darkTheme from './modules/darkTheme';
// axios.defaults.headers.common.Authorization = 'Bearer ' + token

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        user: {
            id: null,
            name: null,
            email: null,
        },
        loading: false,
        error: null,
        verify: false,

        items: [],
        months: ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'noi', 'dec'],
        categories: [],
        subcategories: [],
        types: [],
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
        },
        setVerify(state) {
            state.verify = true;
        },
        setItems(state, payload) {
            state.items = payload;
        },
        setCategories(state, payload) {
            state.categories = payload;
        },
        setSubcategories(state, payload) {
            state.subcategories = payload;
        },
        setTypes(state, payload) {
            state.types = payload;
        },
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
        },
        verify: state => {
            return state.verify;
        },
        items: state => {
            return state.items;
        },
        categories: state => {
            return state.categories;
        },
        subcategories: state => {
            return state.subcategories;
        },
        types: state => {
            return state.types;
        },
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
                url: process.env.VUE_APP_URL + '/verificare-cont',
            }).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    commit('setLoading', false);
                    console.log('Register -> Success');
                    commit('closeRegister');
                    router.push('/verificare-cont/0');
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
            commit('setLoading', true);
            commit('clearError');
            axios.post('/login', {
                email: authData.email,
                password: authData.password,
            }).then(response => {
                commit('setLoading', false);

                if (response && response.data && response.data.responseType === 'success') {
                    commit('closeLogin');
                    console.log('Login -> Success');
                    const authData = {
                        token: response.data.data.jwt,
                        id: response.data.data.user.id,
                        name: response.data.data.user.name,
                        email: response.data.data.user.email,
                    };

                    localStorage.setItem('token', authData.token);
                    commit('authUser', authData);
                    router.push('/profil');
                } else {
                    console.log('Login -> Error');
                    console.log('Login -> Error -> Message: ' + response.data.errorMessage);
                    commit('setLoading', false);
                    commit('setError', response.data.errorMessage);
                }
            });
        },
        /**
         * Re-login on refresh
         * @param commit
         * @returns {number}
         */
        tryAutoLogin({commit}) {
            const token = localStorage.getItem('token');
            if (!token)
                return 0;
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            axios.get('/user').then(res => {
                const authData = {
                    token,
                    id: res.data.data.id,
                    name: res.data.data.name,
                    email: res.data.data.email,
                };
                commit('authUser', authData);
            });
        },
        /**
         * Logout
         * @param commit
         */
        logout({commit}) {
            router.push('/');
            commit('clearAuthData');
        },
        /**
         * Verify account
         * @param commit
         * @param state
         * @param authData
         * @returns {number}
         */
        verify({commit, state}, authData) {
            if (state.token)
                return 0;
            axios.post('verify', {
                code: authData.code,
            }).then(response => {
                console.log(response);
                if (response && response.data && response.data.responseType === 'success') {
                    console.log('intru');
                    state.verify = true;
                }
            });
        },
        /**
         * Gets all items from server
         * @param commit
         * @param state
         * @param query
         */
        loadItems({commit, state}, query) {
            axios.get('/search').then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    console.log('Get -> Success');

                    let items = response.data.data;
                    let created = null;

                    let createdYear = null;
                    let createdMonth = null;
                    let createdDay = null;
                    let createdHour = null;
                    let createdMin = null;

                    const actual = new Date();
                    const actualYear = actual.getFullYear();
                    const actualDay = new Date().getDate();

                    let date = '';


                    items.forEach((item) => {
                        created = new Date(item.created_at);

                        createdYear = created.getFullYear();
                        createdMonth = created.getMonth() + 1;
                        createdDay = created.getDate();
                        createdHour = created.getHours();
                        createdMin = created.getMinutes();

                        if (actualDay - createdDay === 1)
                            date = 'Ieri ' + createdHour + ':' + createdMin;
                        else if (createdDay - actualDay === 0)
                            date = 'Azi ' + createdHour + ':' + createdMin;
                        else
                            date = createdDay + ' ' + state.months[createdMonth - 1];

                        if (createdYear !== actualYear)
                            date = createdDay + ' ' + state.months[createdMonth - 1] + ' ' + createdYear;

                        item.created_at = date;
                    });
                    commit('setItems', items);
                } else {
                    console.log('Get -> Error');
                }
            });
        },
        /**
         * Gets all available categories
         * @param commit
         */
        loadCategories({commit}) {
            axios.get('/categories').then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    console.log('Get Categories-> Success');
                    let res = response.data.data;
                    let categories = [];

                    res.forEach((cat) => {
                        const category = {
                            id: cat.id,
                            name: cat.name,
                        };
                        categories.push(category);
                    });
                    commit('setCategories', categories);
                } else {
                    console.log('Get Categories-> Error');
                }
            });
        },
        /**
         * Gets all available subcategories for a given category
         * @param commit
         */
        loadSubcategories({commit}, category) {
            axios.get('/subcategories/' + category).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    console.log('Get Subcategories -> Success');
                    let res = response.data.data;
                    let subcategories = [];

                    res.forEach((sub) => {
                        const subcategory = {
                            id: sub.id,
                            name: sub.name,
                        };
                        subcategories.push(subcategory);
                    });
                    commit('setSubcategories', subcategories);
                } else {
                    console.log('Get Subcategories -> Error');
                }
            });
        },

        /**
         * Gets all avaible types for a given subcategory
         * @param commit
         * @param subcategory
         */
        loadTypes({commit}, subcategory) {
            axios.get('/types/' + subcategory).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    console.log('Get Types -> Success');
                    let res = response.data.data;
                    let types = [];

                    res.forEach((t) => {
                        const type = {
                            id: t.id,
                            name: t.name,
                        };
                        types.push(type);
                    });
                    commit('setTypes', types);
                } else {
                    console.log('Get Types -> Error');
                }
            });
        },

        /**
         * Add new item
         * @param commit
         * @param item
         */
        addItem({commit}, item) {
            console.log(item);
            axios.post('/user', item).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    console.log('Add item -> Success');
                } else {
                    console.log('Add item -> Error');
                }

            });
        },
    },
    modules: {
        loginModal,
        registerModal,
        darkTheme,
    },
});
