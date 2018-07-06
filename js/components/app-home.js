const R_HOME = Vue.component('app-home', {
    template: `
        <section class="app-home bg-norepeat bg-center flex_h-center flex_v-center flex-column">
            <article class="h-align-center font15 padding_1 margin_1 primary-font">
                Audience interaction,
                realtime polling, quizz and Q&A 
                platform from conferences
            </article>            
            <div class="surface padding_1_0">
                <app-join></app-join>
                <footer class="background flex_v-center flex_h-center">
                    <router-link v-if="!isLogged" to="/login">
                        <a>Login</a>
                    </router-link>
                    <router-link v-if="isLogged" to="/dashboard">
                        <a>Dashboard</a>
                    </router-link>
                </footer>
            </div>
        </section>
    `,
    data: function() {
        return {

        };
    },
    computed: {
        isLogged: function () {
            return Auth.getters.isLogged;
        }
    },
    methods: {
        authenticate: function () {
            this.$router.push('/login')
        }
    }
});
