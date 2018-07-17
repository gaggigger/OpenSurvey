Vue.component('app-login-facebook', {
    template: `
        <section class="sw100-2">
            <div role="button"
                tabindex="0"
                class="pointer display-inline-block sw100-2 btn-social btn-facebook"
                @click="login">
                <span class="fa fa-facebook"></span>
                Sign in with Facebook
            </div>
        </section>
    `,
    data() {
        return {};
    },
    mounted () {
        loadScript(true, 'https://connect.facebook.net/en_US/sdk.js', 'facebook-jssdk');
    },
    methods: {
        init() {
            if (typeof FB === 'undefined') {
                window.setTimeout(() => {
                    this.init();
                }, 100);
                return false;
            }
            FB.init({
                appId: Config.facebook.app_id,
                cookie: true,  // enable cookies to allow the server to access the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.8' // use graph api version 2.8
            });
        },
        login() {
            this.init();
            FB.login((response) => {
                window.location.href = './login.html?'
                    + 'code=' + encodeURIComponent(response.authResponse.accessToken)
                    + '&user_id=' + encodeURIComponent(response.authResponse.userID)
                    + '&provider=facebook'
                ;
            });
        }
    }
});
