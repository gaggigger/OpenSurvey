Vue.component('app-login-linkedin', {
    template: `
        <section class="sw100">
            <a :href="'https://www.linkedin.com/oauth/v2/authorization?client_id=777vw6qg7cyhby&response_type=code&scope=r_basicprofile&state='+state+'&redirect_uri='+redirectUri"
                class="display-inline-block sw100 btn-social btn-linkedin"
                @click="login">
                <span class="fa fa-linkedin"></span>
                Sign in with LinkedIn
            </a>
        </section>
    `,
    data: function () {
        return {};
    },
    computed: {
        state: function() {
            return Math.random();
        },
        redirectUri: function() {
            return window.location.href;
        }
    },
    methods: {
        login: function () {

        }
    }
});
