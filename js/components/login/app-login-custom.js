Vue.component('app-login-custom', {
    template: `
        <div class="sw50 sw100-resp">
            <div class="padding_05_0">
                <input type="username" 
                    v-model="username"
                    class="sw100"
                    name="text" 
                    placeholder="Your username" 
                    required=""
                    autofocus />
            </div>
            <div class="padding_05_0">
                <input type="password"
                    v-model="password"
                    class="sw100" 
                    name="password" 
                    placeholder="Your password" 
                    required="" />
            </div>
            <div class="padding_1_0">
                <span role="button"
                    tabindex="0"
                    @click="login"
                    class="pointer primary padding_05_1 join-button v-align-center h-align-center">
                    Login
                </span>
            </span>
        </div>
    `,
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        login() {

        }
    }
});
