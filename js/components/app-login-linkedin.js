Vue.component('app-login-linkedin', {
    template: `
        <section class="sw100-2">
            <a :href="'https://www.linkedin.com/oauth/v2/authorization?client_id=777vw6qg7cyhby&response_type=code&scope=r_basicprofile&state='+state+'&redirect_uri='+redirectUri"
                class="pointer display-inline-block sw100-2 btn-social btn-linkedin"
                @click="login">
                <span class="fa fa-linkedin"></span>
                Sign in with LinkedIn
            </a>
        </section>
    `,
    data() {
        return {};
    },
    computed: {
        state() {
            return Math.random();
        },
        redirectUri() {
            return window.location.origin + window.location.pathname + 'login.html';
        }
    },
    methods: {
        login() {

        }
    }
});
