// Vue.use(VueAxios, axios);
//  Vue.use(axios);
/*
Vue.use(VueAuthenticate, {
    baseUrl: 'http://localhost:3000', // Your API domain

    providers: {
        github: {
            clientId: '',
            redirectUri: 'https://labs.openschedule.org/github-deployment/' // Your client app URL
        }
    }
});
*/

Vue.component('app-login', {
    template: `
        <section class="app-login background flex_v-center flex_h-center">
            <button @click="authenticate('github')">auth Github</button>
            <button @click="authenticate('facebook')">auth Facebook</button>
            <button @click="authenticate('google')">auth Google</button>
            <button @click="authenticate('twitter')">auth Twitter</button>
        </section>
    `,
    data: function () {
        return {

        }
    },
    methods: {
        authenticate: function (provider) {
            this.$auth.authenticate(provider).then(function (response) {
                // Execute application logic after successful social authentication
                console.log(response);
            })
        }
    }
});
