Vue.component('app-user-logged', {
    template: `
        <div v-if="logged">
            <a href="#" @click="showMenu = !showMenu">{{ user.name }}</a>
            <nav class="user-logged-menu surface" v-show="showMenu">
                <ul>
                    <li>
                        <a href="#" @click="logout">Logout</a>
                    </li>
                </ul>
            </nav>
       </div>
    `,
    computed: {
        user () {
            return Auth.getters.authUser;
        },
        logged () {
            return Auth.getters.isLogged;
        }
    },
    data: function () {
        return {
            showMenu: false
        };
    },
    methods: {
        logout: function() {
            Auth.commit('authToken', null);
            window.location.reload();
        }
    }
});
