const R_LOGIN = Vue.component('app-login', {
    template: `
        <section class="app-login bg-norepeat bg-center flex_h-center flex_v-center page">
            <div class="item-container sw50 sw100-resp padding_0_1">
                <!--div class="flex_h-center flex_v-center flex-column">
                    <app-login-custom></app-login-custom>
                </div-->
                <div>
                    <app-login-google></app-login-google>
                </div>
                <div>
                    <app-login-github></app-login-github>
                </div>
                <div>
                    <app-login-facebook></app-login-facebook>
                </div>
                <div>
                    <app-login-linkedin></app-login-linkedin>
                </div>
                
                <footer class="h-align-center padding_1_0">
                    Join an event
                    <router-link to="/">here</router-link>
                </footer>
            </div>
        </section>
    `,
    data() {
        return {};
    },
    mounted() {
        loadLink('https://lipis.github.io/bootstrap-social/assets/css/font-awesome.css', 'social-font-awesome');
        loadLink('css/social.css', 'social');
    },
    methods: {

    }
});
