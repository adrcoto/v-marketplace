import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import router from '../router';
//modules
import loginModal from './modules/loginModal';
import registerModal from './modules/registerModal';
import darkTheme from './modules/darkTheme';

import notification from './modules/notification';
// axios.defaults.headers.common.Authorization = 'Bearer ' + token

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        date: '',
        favorites: [],
        user: {
            id: null,
            name: null,
            email: null,
            location: null,
            phone: null,
        },
        verify: false,

        items: [],
        itemsCount: 0,
        months: ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'noi', 'dec'],
        categories: [],
        subcategories: [],
        types: [],

        colors: {
            error: 'error',
            warning: 'warning',
            info: 'info',
        },
    },
    mutations: {
        authUser(state, userData) {
            state.token = userData.token;
            state.user.id = userData.id;
            state.user.name = userData.name;
            state.user.email = userData.email;
            state.user.location = userData.location;
            state.user.phone = userData.phone;
        },
        setUser(state, user) {
            state.user = user;
        },
        clearAuthData(state) {
            state.token = null;
            state.user.id = null;
            state.user.name = null;
            state.user.email = null;
            state.user.location = null;
            state.user.phone = null;

            sessionStorage.removeItem('token');
        },
        setVerify(state) {
            state.verify = true;
        },
        setItems(state, payload) {
            state.items = payload;
        },
        setFavorites(state, payload) {
            state.favorites = payload;
        },
        setItemsCount(state, payload) {
            state.itemsCount = payload;
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
        setPage(state, payload) {
            state.page = payload;
        },
        setPerPage(state, payload) {
            state.perPage = payload;
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
        verify: state => {
            return state.verify;
        },
        items: state => {
            return state.items;
        },
        itemsCount: state => {
            return state.itemsCount;
        },
        item: state => id => {
            return state.items.find(item => item.item_id === id);
        },
        favorites: state => {
            return state.favorites;
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
        colors: state => {
            return state.colors;
        },
        page: state => {
            return state.page;
        },
        perPAge: state => {
            return state.perPage;
        },
    },
    /**
     * Actions
     */
    actions: {
        /**
         * Register user
         * @param commit
         * @param state
         * @param authData
         */
        register({commit, state}, authData) {
            axios.post('/register', {
                name: authData.name,
                email: authData.email,
                password: authData.password,
                url: process.env.VUE_APP_URL + '/verificare-cont',
            }).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    console.log('Register -> Success');
                    commit('closeRegister');
                    router.push('/verificare-cont/0');
                } else {
                    console.log('Register -> Error');
                    commit('setSnack', {
                        message: response.data.errorMessage,
                        color: state.colors.error,
                    });
                }
            });
        },

        /**
         * Login user
         * @param commit
         * @param state
         * @param dispatch
         * @param authData
         */
        login({commit, state, dispatch}, authData) {
            axios.post('/login', {
                email: authData.email,
                password: authData.password,
            }).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    commit('setSnack', {
                        message: 'Bun venit ' + response.data.data.user.name,
                        color: state.colors.info,
                    });
                    commit('closeLogin');
                    console.log('Login -> Success');
                    const authData = {
                        token: response.data.data.jwt,
                        id: response.data.data.user.id,
                        name: response.data.data.user.name,
                        email: response.data.data.user.email,
                        location: response.data.data.user.location,
                        phone: response.data.data.user.phone,
                    };

                    sessionStorage.setItem('token', authData.token);
                    commit('authUser', authData);
                    dispatch('loadFavorites');
                    router.push('/profil');
                } else {
                    console.log('Login -> Error');
                    commit('setSnack', {
                        message: response.data.errorMessage,
                        color: state.colors.error,
                    });
                }
            });
        },
        /**
         * Re-login on refresh
         * @param commit
         * @param dispatch
         * @returns {number}
         */
        tryAutoLogin({commit, dispatch}) {
            const token = sessionStorage.getItem('token');
            if (!token)
                return 0;
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            axios.get('/user').then(res => {
                const authData = {
                    token,
                    id: res.data.data.id,
                    name: res.data.data.name,
                    email: res.data.data.email,
                    location: res.data.data.location,
                    phone: res.data.data.phone,
                };
                commit('authUser', authData);
                dispatch('loadFavorites');
            });
        },
        /**
         * Logout
         * @param commit
         */
        logout({commit, state}) {
            router.push('/');
            commit('clearAuthData');
            commit('setSnack', {
                message: 'La revedere',
                color: state.colors.info,
            });
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
                    state.verify = true;
                } else {
                    commit('setSnack', {
                        message: response.data.errorMessage,
                        color: state.colors.error,
                    });
                }
            });
        },

        /**
         * Gets all items from server
         * @param commit
         * @param state
         * @param payload
         * @param dispatch
         */
        loadItems({commit, state, dispatch}, payload) {
            let query = '';
            let page = 0;
            let perPage = 15;

            if (payload !== undefined) {
                if (payload.query !== undefined)
                    query = payload.query;

                if (payload.page !== undefined)
                    page = payload.page;

                if (payload.perPage !== undefined)
                    perPage = payload.perPage;
            }

            axios.get('/search', {
                params: {
                    q: query,
                    page,
                    perPage,
                },
            }).then(response => {

                if (response && response.data && response.data.responseType === 'success') {
                    console.log('Get Items-> Success');


                    let items = response.data.data.items;
                    commit('setItemsCount', response.data.data.total);

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
                        created = new Date(item.created_at.date);

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
                    if (response.data.data === null)
                        dispatch('loadItems');
                    console.log('Get -> Error');
                }
            });
        },

        /**
         * Load one item
         * @param commit
         * @param payload
         * @returns {Promise<AxiosResponse<T>>}
         */
        loadItem({commit}, payload) {
            return axios.get('/item/' + payload);
        },

        /**
         * Load owner items
         * @param commit
         * @param payload
         * @returns {Promise<AxiosResponse<T>>}
         */
        loadOwnerItems({commit}, payload) {
            return axios.get('/search', {
                params: {
                    owner: payload,
                    page: 0,
                    perPage: 10,
                },
            });
        },

        /**
         * Gets all available categories
         * @param commit
         * @param dispatch
         */
        loadCategories({commit, dispatch}) {
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
                    dispatch('ladCategories');
                }
            });
        },
        /**
         * Gets all available subcategories for a given category
         * @param commit
         * @param category
         */
        loadSubcategories({commit}, category) {
            return axios.get('/subcategories/' + category).then(response => {
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
         * @param state
         * @param dispatch
         * @param item
         */
        addItem({commit, state, dispatch}, item) {
            axios.post('/item', item).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    console.log('Add item -> Success');

                    commit('setSnack', {
                        message: 'Anunțul a fost adăugat cu success.',
                        color: state.colors.info,
                    });
                    dispatch('loadItems');

                    setTimeout(() => {
                        router.push({path: '/profil'});
                    }, 1000);
                } else {
                    console.log('Add item -> Error');
                    commit('setSnack', {
                        message: response.data.errorMessage,
                        color: state.colors.error,
                    });
                }
            });
        },

        /**
         * Delete item
         * @param commit
         * @param state
         * @param dispatch
         * @param id
         */
        deleteItem({commit, state, dispatch}, id) {
            const token = state.token;
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            axios.delete('/item/' + id).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    dispatch('loadItems');
                    commit('setSnack', {
                        message: 'Anunțul a fost șters',
                        color: state.colors.info,
                    });
                } else {
                    commit('setSnack', {
                        message: response.data.errorMessage,
                        color: state.colors.error,
                    });
                }
            });
        },

        /**
         * Update item
         * @param commit
         * @param state
         * @param dispatch
         * @param payload
         */
        updateItem({commit, state, dispatch}, payload) {
            const token = state.token;
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            axios.post('/item/' + payload.id, payload.form,
            ).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    dispatch('loadItems');
                    commit('setSnack', {
                        message: 'Anunțul a fost actualizat',
                        color: state.colors.info,
                    });
                    setTimeout(() => {
                        router.push({path: '/profil'});
                    }, 1000);
                } else {
                    commit('setSnack', {
                        message: response.data.errorMessage,
                        color: state.colors.error,
                    });
                }
            });
        },
        /**
         * Update user
         * @param commit
         * @param state
         * @param dispatch
         * @param payload
         */
        updateUser({commit, state, dispatch}, payload) {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };

            console.log(payload);
            const form = new FormData();
            form.append('name', payload.name);
            form.append('phone', payload.phone);

            const token = state.token;
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            axios.post('/user', {
                form,
                _method: 'POST',
            }).then(response => {
                if (response && response.data && response.data.responseType === 'success') {

                    commit('setSnack', {
                        message: 'Profilul a fost actualizat',
                        color: state.colors.info,
                    });
                } else {
                    commit('setSnack', {
                        message: response.data.errorMessage,
                        color: state.colors.error,
                    });
                }
            });
        },

        /**
         * Looad favorite items
         * @param commit
         * @param dispatch
         * @param state
         */
        loadFavorites({commit, dispatch, state}) {
            const token = sessionStorage.getItem('token');
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            return axios.get('/favorites').then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    commit('setFavorites', response.data.data);
                } else {
                    dispatch('loadFavorites');
                }
            });
        },


        /**
         * Add to favorite
         * @param commit
         * @param state
         * @param dispatch
         * @param item
         */
        addToFavorite({commit, state, dispatch}, item) {
            const token = state.token;
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            axios.post('/favorites', {
                item: item,
            }).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    dispatch('loadFavorites');
                    commit('setSnack', {
                        message: 'Anunțul a fost adăugat în lista de favorite',
                        color: state.colors.info,
                    });
                } else {
                    commit('setSnack', {
                        message: 'Anunțul există deja in lista dumneavoastră de anunțuri favorite',
                        color: state.colors.warning,
                    });
                }
            });
        },

        /**
         * Remove from favorite
         * @param commit
         * @param state
         * @param dispatch
         * @param id
         */
        removeFromFavorite({commit, state, dispatch}, id) {
            const token = state.token;
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            axios.delete('/favorites/' + id).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    dispatch('loadFavorites');
                    commit('setSnack', {
                        message: 'Anunțul a fost șters din lista de fovorite',
                        color: state.colors.info,
                    });
                } else {
                    commit('setSnack', {
                        message: 'Anunțul nu a putut fi șters din lista de fovorite',
                        color: state.colors.warning,
                    });
                }
            });
        },
    },
    modules: {
        loginModal,
        registerModal,
        darkTheme,
        notification,
    },
});
