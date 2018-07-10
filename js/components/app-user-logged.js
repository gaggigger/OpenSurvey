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
            window.location.reload();
        }
    }
});
