const state = {
    q: '',
    location: {
        value: '',
        city: '',
        district: '',
    },
    category: {
        name: '',
        value: 0,
    },
    sub_category: {
        name: '',
        value: 0,
    },
    page: 1,
    perPage: 15,
};

const mutations = {
    setQ(state, q) {
        state.q = q;
    },
    setCity(state, city) {
        state.location.city = city;
    },
    setDistrict(state, district) {
        state.location.district = district;
    },
    setLocation(state, location) {
        state.location.value = location;
    },
    setCategory(state, category) {
        state.category.name = category.name;
        state.category.value = category.value;
    },
    setSubcategory(state, subcategory) {
        state.sub_category.name = subcategory.name;
        state.sub_category.value = subcategory.value;
    },
    setPage(state, page) {
        state.page = page;
    },
    setPerPage(state, perPage) {
        state.perPage = perPage;
    }
};


const getters = {
    q: state => {
        return state.q;
    },
    location: state => {
        return state.location;
    },
    category: state => {
        return state.category;
    },
    sub_category: state => {
        return state.sub_category;
    },
    page: state => {
        return state.page;
    },
    perPage: state => {
        return state.perPage;
    }
};

const actions = {
    clearQ({commit}) {
        commit('setQ', '');
    },
    clearLocation({commit}) {
        commit('setLocation', '');
        commit('setDistrict', '');
        commit('setCity', '');
    },

    clearCategory({commit}) {
        commit('setCategory', {
            name: '',
            value: 0,
        });
    },
    clearSubcategory({commit}) {
        commit('setSubcategory', {
            name: '',
            value: 0,
        })
    },
    clearCity({commit}) {
        commit('setCity', '');
    }
};


export default {
    state,
    getters,
    mutations,
    actions,
};
