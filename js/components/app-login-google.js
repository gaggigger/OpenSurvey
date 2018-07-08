Vue.component('app-login-google', {
    template: `
        <section class="sw100-2">
            <div role="button"
                tabindex="0"
                id="btn-google-login"
                class="pointer display-inline-block sw100-2 btn-social btn-google">
                <span class="fa fa-google"></span>
                Sign in with Google
            </div>
        </section>
    `,
    data() {
        return {};
    },
    mounted() {
        loadScript(true, 'https://apis.google.com/js/platform.js', 'gg-platform');
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            if (typeof gapi === 'undefined') {
                window.setTimeout(() => {
                    this.init();
                }, 100);
                return false;
            }
            gapi.load('auth2', () => {
                // Retrieve the singleton for the GoogleAuth library and set up the client.
                const auth2 = gapi.auth2.init({
                    client_id: Config.google.client_id,
                    cookiepolicy: 'single_host_origin',
                    // Request scopes in addition to 'profile' and 'email'
                    //scope: 'additional_scope'
                });
                auth2.attachClickHandler('btn-google-login', {},
                    (googleUser) => {
                        this.login(googleUser);
                    }, (error) => {
                        // console.error(JSON.stringify(error, undefined, 2));
                    });
            });
        },
        login(googleUser) {
            window.location.href = window.location.origin
                + window.location.pathname
                + 'login.html?'
                + 'code=' + encodeURIComponent(googleUser.getAuthResponse().id_token)
                + '&provider=google'
            ;
        }
    }
});
