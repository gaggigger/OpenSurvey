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
                return JSON.parse(atob(state.authToken.split('.')[1]));
            } catch (e) {
                return {
                    name: ''
                }
            }
        },
        isGuest: function(state) {
            var user = Auth.getters.isLogged;
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