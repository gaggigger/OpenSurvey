Vue.component('app-user-logged', {
    template: `
        <div v-if="logged">
            <a href="#" @click="logout">logout ({{ user.name }})</a>
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
                            window.location.reload();
                        });
                        break;
                    case 'facebook':
                        FB.logout(function(response) {
                            window.location.reload();
                        });
                        break;
                    default:
                        window.location.reload();
                        break;
                }
            }

        }
    }
});
