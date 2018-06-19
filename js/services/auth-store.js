const AuthStore = new Vuex.Store({
    state: {
        authToken: null
    },
    getters: {
        isLogged: state => {
            const token = Storage.get('osu-token');
            state.authToken = token;
            return !!token
        },
        authUser: state => {
            if (state.authToken === null) {
                return {
                    name: ''
                }
            }
            return JSON.parse(atob(state.authToken.split('.')[1]));
        }
    },
    mutations: {
        authToken (state, token) {
            state.authToken = token;
            Storage.set('osu-token', token);
        }
    }
});
// Update state
AuthStore.commit('authToken', Storage.get('osu-token'));