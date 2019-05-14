const state = {
    darkTheme: false,
};
const getters = {
    dark: state => {
        return state.darkTheme;
    },
    month: (state, payload) => {
        return state.months[payload];
    }
};

const mutations = {
    toggleDark: state => {
        state.darkTheme = !state.darkTheme;
    }
};

const actions = {
    toggleDark: ({commit}) => {
        commit('toggleDark');
    }
};

export default{
    state,
    getters,
    mutations,
    actions
}