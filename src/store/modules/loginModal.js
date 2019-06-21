const state = {
    login: false,
    forgot: false,
};

const mutations = {
    showLogin: state => {
        state.login = true;
    },
    closeLogin: state => {
        state.login = false;
    },
    showForgot: state => {
        state.forgot = true;
    },
    closeForgot: state =>{
        state.forgot = false;
    }
};

const getters = {
    showLogin: state => {
        return state.login;
    },

    showForgot: state => {
        return state.forgot;
    }
};



const actions = {
    showLogin: ({commit}) => {
        commit('showLogin');
    },
    closeLogin: ({commit}) => {
        commit('closeLogin');
    },

    showForgot: ({commit}) => {
        commit('showForgot');
    },
    closeForgot: ({commit}) => {
        commit('closeForgot');
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
