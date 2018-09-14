const R_IDENTIFICATION = Vue.component('client-identitication', {
    template: `
        <div class="page">
            <md-card class="margin_1">
                <md-card-header class="h-align-center">
                    <h2>Please enter your name or nickname to access the event</h2>
                </md-card-header>
                <md-card-content class="flex_h-center">
                    <md-field>
                        <label>Enter your nickname</label>
                        <md-input autocorrect="off"
                            autocapitalize="off"
                            name="username"
                            type="text"
                            v-model="username"
                            aria-label="Enter your nickname"
                            autocomplete="off"
                            @keydown="join($event)"
                            autofocus />
                    </md-field>
                    <md-button role="button"
                        tabindex="0"
                        @click="join()"
                        class="pointer md-raised md-primary">
                        Join
                    </md-button>
                </md-card-content>
            </md-card>
        </div>
    `,
    props: {
        event: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            username: ''
        };
    },
    created() {
        if(Auth.getters.isLogged) {
            this.$router.push({ name: 'home', params: {
                event: this.event
            }});
        }
    },
    methods: {
        join(evt) {
            if(evt && evt.keyCode !== 13) {
                return;
            }
            window.location.href = './login.html?'
                + 'code=' + encodeURIComponent(this.username)
                + '&provider=guest'
                + '#/' + encodeURIComponent(this.event)
            ;
        }
    }
});
