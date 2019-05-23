const state = {
    snack: '',
    color: '',
};

const mutations = {
    setSnack(state, payload) {
        state.snack = payload.message;
        state.color = payload.color;
    },
};

export default {
    state,
    mutations,
};