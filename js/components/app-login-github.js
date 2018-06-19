Vue.component('app-login-github', {
    template: `
        <section class="sw100-2">
            <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=572811babd84307d5b96"
                class="display-inline-block sw100-2 btn-social btn-github">
                <span class="fa fa-github"></span>
                Sign in with Github
            </a>
        </section>
    `,
    data: function () {
        return {};
    },
    methods: {
        login: function () {

        }
    }
});
