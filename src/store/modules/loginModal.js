const state = {
    login: false
};

const getters = {
    showLogin: state => {
        return state.login;
    }
};

const mutations = {
    showLogin: state => {
        state.login = true;
    },
    closeLogin: state => {
        state.login = false;
    }
};

const actions = {
    showLogin: ({commit}) => {
        commit('showLogin');
    },
    closeLogin: ({commit}) => {
        commit('closeLogin');
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
