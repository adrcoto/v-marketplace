const state = {
    register: false
};
const getters = {
    showRegister: state => {
        return state.register;
    }
};

const mutations = {
    showRegister: state => {
        state.register = true;
    },
    closeRegister: state => {
        state.register = false;
    }
};

const actions = {
    showRegister: ({commit}) => {
        commit('showRegister');
    },
    closeRegister: ({commit}) => {
        commit('closeRegister');
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
