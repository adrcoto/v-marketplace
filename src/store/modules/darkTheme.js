const state = {
    darkTheme: false,
};
const getters = {
    darkTheme: state => {
        return state.darkTheme;
    },
};

const mutations = {
    toggleDark: state => {
        state.darkTheme = !state.darkTheme;
    },
    setDark(state, dark) {
        state.darkTheme = dark;
    }
};

const actions = {
    toggleDark: ({commit, state}) => {
        commit('toggleDark');
        localStorage.setItem('dark', state.darkTheme);
    },
    setDark({commit}) {
        if (localStorage.getItem('dark'))
            if (localStorage.getItem('dark') === 'true')
                commit('setDark', true);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}