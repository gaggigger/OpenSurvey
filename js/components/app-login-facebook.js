Vue.component('app-login-facebook', {
    template: `
        <section class="sw100">
            <a href="#"
                class="display-inline-block sw100 btn-social btn-facebook"
                @click="login">
                <span class="fa fa-facebook"></span>
                Sign in with Facebook
            </a>
        </section>
    `,
    data: function () {
        return {};
    },
    methods: {
        init: function () {
            FB.init({
                appId: '1849098195384170',
                cookie: true,  // enable cookies to allow the server to access the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.8' // use graph api version 2.8
            });
        },
        login: function () {
            this.init();
            FB.login((response) => {
                console.log(response);
                //statusChangeCallback(response);
            });
        }
    }
});
