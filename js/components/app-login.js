const R_LOGIN = Vue.component('app-login', {
    template: `
        <section class="app-login bg-norepeat flex_h-center flex_v-center">
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
    methods: {
        login: function () {
            console.log(this.username, this.password);
        }
    }
});
