const state = {
    darkTheme: false
};
const getters = {
    dark: state => {
        return state.darkTheme;
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