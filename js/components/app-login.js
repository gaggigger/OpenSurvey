const R_LOGIN = Vue.component('app-login', {
    template: `
        <section class="app-login bg-norepeat bg-center flex_h-center flex_v-center">
            <div class="item-container sw50 sw100-resp padding_0_1">
                <div>
                    <input type="username" 
                        v-model="username"
                        class="sw100"
                        name="text" 
                        placeholder="Your username" 
                        required=""
                        autofocus />
                </div>
                <div>
                    <input type="password"
                        v-model="password"
                        class="sw100" 
                        name="password" 
                        placeholder="Your password" 
                        required="" />
                </div>
                <div>
                    <a href="#" 
                        @click="login"
                        class="primary padding_05_1 join-button v-align-center h-align-center">
                        Login
                    </a>
                </div>
                <div class="flex_h-center flex_v-center flex-column">
                    <div id="signin-google"></div>
                    <div>
                        <span 
                            @click="logout"
                            class="a-like h-align-center">
                            Logout
                        </span>
                    </div>
                </div>
                <footer class="h-align-center">
                    Join an event
                    <router-link to="/">here</router-link>
                </footer>
            </div>
        </section>
    `,
    data: function () {
        return {
            username: '',
            password: ''
        }
    },
    created: function() {
        window.setTimeout(() => {
            gapi.signin2.render('signin-google', {
                'scope': 'profile email',
                'width': 240,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': (googleUser) => {
                    let profile = googleUser.getBasicProfile();
                    console.log(profile);
                    let idToken = googleUser.getAuthResponse().id_token;
                    console.log("ID Token: " + idToken);
                },
                'onfailure': () => {

                }
            });
        }, 100);
    },
    methods: {
        login: function () {
            console.log(this.username, this.password);
        },
        logout: function () {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
        }
    }
});

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
