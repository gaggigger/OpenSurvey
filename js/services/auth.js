const Auth = new Vuex.Store({
    state: {
        authToken: null
    },
    getters: {
        isLogged(state) {
            let token = Storage.get('osu-token');
            state.authToken = token;
            return !!token
        },
        authUser(state) {
            if (!state.authToken) {
                return {
                    name: ''
                }
            }
            try {
                return JSON.parse(atob(state.authToken.split('.')[1]));
            } catch (e) {
                return {
                    name: ''
                }
            }
        }
    },
    mutations: {
        authToken(state, token) {
            if(token === 'null') token = null;
            state.authToken = token;
            Storage.set('osu-token', token);
        }
    }
});

// Update state
Auth.commit('authToken', Storage.get('osu-token'));