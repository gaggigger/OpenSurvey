const Auth = new Vuex.Store({
    state: {
        authToken: null
    },
    getters: {
        isLogged: function(state) {
            var token = Storage.get('osu-token');
            state.authToken = token;
            return !!token;
        },
        authUser: function(state) {
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
        isGuest: function(state) {
            if(! Auth.getters.isLogged) return false;
            var user = Auth.getters.authUser;
            return user.provider === 'guest';
        }
    },
    mutations: {
        authToken: function(state, token) {
            if(token === 'null') token = null;
            state.authToken = token;
            Storage.set('osu-token', token);
        }
    }
});

// Update state
Auth.commit('authToken', Storage.get('osu-token'));