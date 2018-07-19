const Auth = new Vuex.Store({
    state: {
        authToken: null,
        numberOfConnectedClient: 0
    },
    getters: {
        isLogged(state) {
            const token = Storage.get('osu-token');
            state.authToken = token;
            return !!token;
        },
        authUser(state) {
            if (!state.authToken) {
                return {
                    name: ''
                }
            }
            try {
                return TokenService.getPayload(state.authToken);
            } catch (e) {
                return {
                    name: ''
                }
            }
        },
        isGuest(state) {
            if(! Auth.getters.isLogged) return false;
            const user = Auth.getters.authUser;
            return user.provider === 'guest';
        },
        numberOfConnectedUsers(state) {
            return state.numberOfConnectedClient;
        }
    },
    mutations: {
        authToken(state, token) {
            if(token === 'null') token = null;
            state.authToken = token;
            Storage.set('osu-token', token);
        },
        connectedUsers(state, num) {
            state.numberOfConnectedClient = num;
        }
    }
});

// Update state
Auth.commit('authToken', Storage.get('osu-token'));