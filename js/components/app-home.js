const R_HOME = Vue.component('app-home', {
    template: `
        <section class="app-home bg-norepeat bg-center flex_h-center flex_v-center flex-column">
            <h1>OpenSurvey</h1>
            <p class="md-primary h-align-center font15 padding_1 margin_1">
                Audience interaction,
                realtime polling, quizz and Q&A 
                platform for conferences
            </p>            
            <md-card class="join">
                <md-card-content>
                    <app-join></app-join>
                </md-card-content>
                <md-card-actions md-alignment="left">
                    <md-button>
                        <router-link v-if="!isLogged" to="/login">
                            Login
                        </router-link>
                        <router-link v-if="isLogged && !isGuest" to="/dashboard">
                            Dashboard
                        </router-link>
                    </md-button>
                </md-card-actions>
            </md-card>
        </section>
    `,
    data() {
        return {

        };
    },
    computed: {
        isLogged() {
            return Auth.getters.isLogged;
        },
        isGuest() {
            return Auth.getters.isGuest;
        }
    },
    created: function() {
        //if(Auth.getters.isGuest) window.location.href = './event.html';
    },
    methods: {
        authenticate() {
            this.$router.push({ name: 'login' })
        }
    }
});
