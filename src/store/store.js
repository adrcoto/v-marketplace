import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import router from '../router';
//modules
import loginModal from './modules/loginModal';
import registerModal from './modules/registerModal';
import darkTheme from './modules/darkTheme';
import filter from './modules/filtres'

//util
import {getMessage, getItemMessage, calculateDate} from "../util/util";

import notification from './modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        date: '',

        user: {},
        verify: false,

        items: [],
        itemsCount: 0,
        ownerItems: [],
        ownerItemsCount: 0,
        favorites: [],
        allFavorites: [],
        favoritesItemsCount: 0,
        viewOwnerItemsCount: 0,

        item: {},
        _ownerItems: [],
        _ownerItemsCount: 0,

        months: ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'noi', 'dec'],
        categories: [],
        subcategories: [],
        types: [],

        colors: {
            error: 'error',
            warning: 'warning',
            info: 'info',
        },

        loading: false,
    },
    mutations: {
        authUser(state, userData) {
            state.token = userData.token;
            state.user = userData.user;
        },
        setUser(state, user) {
            state.user = user;
        },
        clearAuthData(state) {
            state.token = null;
            state.user = {};

            sessionStorage.removeItem('token');
        },
        setVerify(state) {
            state.verify = true;
        },
        setItems(state, payload) {
            state.items = payload;
        },
        setOwnerItems(state, payload) {
            state.ownerItems = payload;
        },
        setFavorites(state, payload) {
            state.favorites = payload;
        },
        setOwnerItemsCount(state, payload) {
            state.ownerItemsCount = payload;
        },
        setFavoritesItemsCount(state, payload) {
            state.favoritesItemsCount = payload;
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

        _setOwnerItems(state, payload) {
            state._ownerItems = payload;
        },
        _setOwnerItemsCount(state, payload) {
            state._ownerItemsCount = payload;
        },
        setItem(state, payload) {
            state.item = payload;
        },
        setLoading(state, payload) {
            state.loading = payload;
        },
        setAllFavorites(state, payload) {
            state.allFavorites = payload;
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
        ownerItems: state => {
            return state.ownerItems;
        },
        ownerItemsCount: state => {
            return state.ownerItemsCount;
        },
        favoritesItemsCount: state => {
            return state.favoritesItemsCount;
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
        _ownerItems: state => {
            return state._ownerItems;
        },
        _ownerItemsCount: state => {
            return state._ownerItemsCount;
        },
        _item: state => {
            return state.item;
        },
        loading: state => {
            return state.loading;
        },
        allFavorites: state => {
            return state.allFavorites;
        }
    },

    /**
     * Actions
     */
    actions: {

        /**
         * Authentification --------------------
         */
        /**
         * Register user
         * @param commit
         * @param state
         * @param authData
         */
        register({commit, state}, authData) {
            commit('setLoading', true);
            axios.post('/register', {
                name: authData.name,
                email: authData.email,
                password: authData.password,
                url: process.env.VUE_APP_URL + '/verificare-cont',
            }).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    commit('setLoading', false);
                    commit('closeRegister');
                    router.push('/verificare-cont/0');
                    localStorage.setItem('verification', authData.email);
                } else {
                    commit('setLoading', false);
                    commit('setSnack', {
                        message: getMessage(response.data.errorMessage),
                        color: state.colors.error,
                    });
                }
            });
        },

        /**
         * Send verifiation email
         * @param commit
         * @param state
         */
        sendVerificationEmail({commit, state}) {
            commit('setLoading', true);
            axios.post('/resend-verification', {
                url: process.env.VUE_APP_URL + '/verificare-cont',
                email: localStorage.getItem('verification'),
            }).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    commit('setSnack', {
                        message: 'E-mail-ul a fost trimis cu success',
                        color: state.colors.info
                    });
                    commit('setLoading', false)
                } else {
                    commit('setSnack', {
                        message: 'E-mail-ul nu a putut fi trimis',
                        color: state.colors.info
                    });
                    commit('setLoading', false)
                }
            });
        },

        /**
         * Verify account
         * @param commit
         * @param state
         * @param authData
         */
        verify({commit, state}, authData) {
            if (state.token)
                return 0;

            return axios.post('verify', {
                code: authData.code,
                email: localStorage.getItem('verification')
            });
        },

        /**
         * Generate code for change / forgot password
         * @param commit
         * @param state
         * @param payload
         */
        generateCode({commit, state}, payload) {
            let params = {};
            const filters = {
                email: payload.email,
                change: payload.change,
            };

            for (let key in filters)
                if (filters[key])
                    params[key] = filters[key];
            return axios.post('forgot-password', params);
        },

        /**
         * Change password
         * @param commit
         * @param state
         * @param payload
         * @returns {Promise<AxiosResponse<T>>}
         */
        changePassword({commit, state}, payload) {
            return axios.post('change-password', {
                email: payload.email,
                code: payload.code,
                password: payload.password
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
                    const authData = {
                        token: response.data.data.jwt,
                        user: {
                            id: response.data.data.user.id,
                            name: response.data.data.user.name,
                            email: response.data.data.user.email,
                            location: response.data.data.user.location,
                            phone: response.data.data.user.phone,
                            avatar: response.data.data.user.avatar,
                        }
                    };

                    sessionStorage.setItem('token', authData.token);
                    commit('authUser', authData);
                    router.push('/profil');
                    dispatch('loadAllFavorites');
                } else {
                    commit('setSnack', {
                        message: getMessage(response.data.errorMessage),
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
                    user: {
                        id: res.data.data.id,
                        name: res.data.data.name,
                        email: res.data.data.email,
                        location: res.data.data.location,
                        phone: res.data.data.phone,
                        avatar: res.data.data.avatar,
                    },
                };
                commit('authUser', authData);
                dispatch('loadAllFavorites');
            });
        },

        /**
         * Logout
         * @param commit
         * @param state
         */
        logout({commit, state}) {
            router.push('/');
            commit('clearAuthData');
            commit('setFavorites', []);
            commit('setFavoritesItemsCount', 0);
            commit('setOwnerItems', []);
            commit('setOwnerItemsCount', 0);
            commit('setSnack', {
                message: 'La revedere',
                color: state.colors.info,
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
            const token = state.token;
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;

            axios.patch('/user', payload).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    dispatch('tryAutoLogin');
                    commit('setSnack', {
                        message: 'Profilul a fost actualizat',
                        color: state.colors.info,
                    });
                } else {
                    commit('setSnack', {
                        message: getMessage(response.data.errorMessage),
                        color: state.colors.error,
                    });
                }
            });
        },

        /**
         *
         * @param commit
         * @param state
         * @param dispatch
         * @param payload
         */
        updateAvatar({commit, state, dispatch}, payload) {
            const token = state.token;
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;

            axios.post('/user', payload).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    dispatch('tryAutoLogin');
                    commit('setSnack', {
                        message: 'Profilul a fost actualizat',
                        color: state.colors.info,
                    });
                } else {
                    commit('setSnack', {
                        message: 'Poza de profil nu a putut fi actualizata',
                        color: state.colors.error,
                    });
                }
            });
        },

        /**
         * Items --------------------
         */

        /**
         * Load items
         * @param commit
         * @param state
         * @param dispatch
         * @param payload
         */
        loadItems({commit, state, dispatch}, payload) {
            let params = {};

            const filters = {
                q: filter.state.q,
                city: filter.state.location.city,
                district: filter.state.location.district,
                category: filter.state.category.value,
                sub_category: filter.state.sub_category.value,
                page: filter.state.page,
                perPage: filter.state.perPage,
            };

            for (let key in filters)
                if (filters[key])
                    params[key] = filters[key];

            axios.get('/search', {params}).then(response => {

                if (response && response.data && response.data.responseType === 'success') {
                    let items = response.data.data.items;
                    commit('setItemsCount', response.data.data.total);

                    let created = null;
                    const actual = new Date();
                    const actualYear = actual.getFullYear();
                    const actualDay = new Date().getDate();

                    items.forEach((item) => {
                        created = new Date(item.created_at.date);
                        item.created_at = calculateDate(actual, actualDay, actualYear, created);
                    });

                    commit('setItems', items);
                } else {
                    if (response.data.data === null)
                        dispatch('loadItems');
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
         * Add new item
         * @param commit
         * @param state
         * @param dispatch
         * @param item
         */
        addItem({commit, state, dispatch}, item) {
            axios.post('/item', item).then(response => {
                if (response && response.data && response.data.responseType === 'success') {

                    commit('setSnack', {
                        message: 'Anunțul a fost adăugat cu success.',
                        color: state.colors.info,
                    });
                    dispatch('loadItems');

                    setTimeout(() => {
                        router.push({path: '/profil'});
                    }, 1000);
                } else {
                    commit('setSnack', {
                        message: getItemMessage(response.data.errorMessage),
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
                    commit('setSnack', {
                        message: 'Anunțul a fost șters',
                        color: state.colors.info,
                    });
                    dispatch('loadOwnerItems');
                } else {
                    commit('setSnack', {
                        message: getItemMessage(response.data.errorMessage),
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
                        message: getItemMessage(response.data.errorMessage),
                        color: state.colors.error,
                    });
                }
            });
        },

        /**
         * Load owner items
         * @param commit
         * @param state
         * @param dispatch
         * @returns {Promise<AxiosResponse<T>>}
         */
        loadOwnerItems({commit, state, dispatch}) {
            const token = sessionStorage.getItem('token');
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            return axios.get('/item', {
                params: {
                    page: filter.state.ownerItemsPage,
                    perPage: filter.state.ownerItemsPerPage,
                },
            }).then(response => {
                if (response && response.data && response.data.responseType === 'success') {

                    let items = response.data.data.items;
                    commit('setOwnerItemsCount', response.data.data.total);

                    const actual = new Date();
                    const actualYear = actual.getFullYear();
                    const actualDay = new Date().getDate();

                    items.forEach((item) => {
                        item.created_at = calculateDate(actual, actualDay, actualYear, new Date(item.created_at.date));
                    });

                    commit('setOwnerItems', items);
                } else {
                    if (response.data.data === null)
                        dispatch('loadOwnerItems');
                }
            });
        },

        /**
         * Categories --------------------
         */

        /**
         * Gets all available categories
         * @param commit
         * @param dispatch
         */
        loadCategories({commit, dispatch}) {
            axios.get('/categories').then(response => {
                if (response && response.data && response.data.responseType === 'success') {
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
                    dispatch('loadCategories');
                }
            });
        },

        /**
         * Gets all available subcategories for a given category
         * @param commit
         * @param dispatch
         * @param category
         * @returns {Promise<AxiosResponse<T> | never>}
         */
        loadSubcategories({commit, dispatch}, category) {
            return axios.get('/subcategories/' + category).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
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
                    dispatch('loadSubcategories', category);
                }
            });
        },

        /**
         * Clear subcategories
         * @param commit
         */
        clearLoadedSubcategories({commit}) {
            commit('setSubcategories', {});
        },

        /**
         * Gets all avaible types for a given subcategory
         * @param commit
         * @param dispatch
         * @param subcategory
         */
        loadTypes({commit, dispatch}, subcategory) {
            axios.get('/types/' + subcategory).then(response => {
                if (response && response.data && response.data.responseType === 'success') {
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
                    dispatch('loadTypes', subcategory);
                }
            });
        },


        /**
         * Favorites --------------------
         */

        /**
         * Looad favorite items
         * @param commit
         * @param dispatch
         * @param state
         */
        loadFavorites({commit, dispatch, state}) {
            const token = sessionStorage.getItem('token');
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            return axios.get('/favorites', {
                params: {
                    page: filter.state.favoritesItemsPage,
                    perPage: filter.state.favoritesItemsPerPage,
                }
            }).then(response => {
                if (response && response.data && response.data.responseType === 'success') {

                    let items = response.data.data.items;
                    commit('setFavoritesItemsCount', response.data.data.total);

                    let created = null;

                    const actual = new Date();
                    const actualYear = actual.getFullYear();
                    const actualDay = new Date().getDate();

                    items.forEach((item) => {
                        created = new Date(item.created_at);

                        item.created_at = calculateDate(actual, actualDay, actualYear, created);
                    });

                    commit('setFavorites', items);
                } else {
                    if (response.data.data === null)
                        dispatch('loadFavorites');
                }
            });
        },

        /**
         * Load all favorites
         * @param commit
         * @param dispatch
         * @param state
         */
        loadAllFavorites({commit, dispatch, state}) {
            const token = sessionStorage.getItem('token');
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            return axios.get('/favorites/all', {}).then(response => {
                if (response && response.data && response.data.responseType === 'success') {

                    let items = response.data.data;

                    commit('setAllFavorites', items);
                } else {
                    if (response.data.data === null)
                        dispatch('loadAllFavorites');
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
                    const favorite = {
                        user: state.user.id,
                        item: item,
                    };
                    state.allFavorites.push(favorite);
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
                    state.allFavorites.splice(state.allFavorites.findIndex(favorite => favorite.item === id), 1);
                } else {
                    commit('setSnack', {
                        message: 'Anunțul nu a putut fi șters din lista de fovorite',
                        color: state.colors.warning,
                    });
                }
            });
        },

        /**
         * Get View Item
         * @param commit
         * @param state
         * @param dispatch
         * @param payload
         * @returns {Promise<AxiosResponse<T>>}
         */
        getItem({commit, state, dispatch}, payload) {

            return axios.get('/item/' + payload.id, {
                params: {
                    slug: payload.slug
                }
            });
        },

        _ownerItems({commit, state, dispatch}, id) {
            return axios.get('/items/' + id, {
                params: {
                    page: filter.state.viewOwnerItemsPage
                }
            });
        }
    },
    modules: {
        loginModal,
        registerModal,
        darkTheme,
        notification,
        filter,
    },
});
