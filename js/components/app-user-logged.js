Vue.component('app-user-logged', {
    template: `
        <div v-if="logged" @click="logout" class="pointer">
            <md-icon>power_settings_new</md-icon>
       </div>
    `,
    computed: {
        user() {
            return Auth.getters.authUser;
        },
        logged () {
            return Auth.getters.isLogged;
        }
    },
    data() {
        return {
            showMenu: false
        };
    },
    methods: {
        logout() {
            Auth.commit('authToken', null);
            if(Auth.getters.authUser) {
                switch (Auth.getters.authUser.provider) {
                    case 'google':
                        const auth2 = gapi.auth2.getAuthInstance();
                        auth2.signOut().then(function () {
                            window.location.href = './';
                        });
                        break;
                    case 'facebook':
                        FB.logout(function(response) {
                            window.location.href = './';
                        });
                        break;
                    default:
                        window.location.href = './';
                        break;
                }
            }

        }
    }
});
