const R_IDENTIFICATION = Vue.component('client-identitication', {
    template: `
        <section class="surface padding_top_3">
           <h2 class="h-align-center">
               Please enter your name or nickname to access the event
           </h2>
           <div class="flex_h-center padding_1">
               <input autocorrect="off"
                       autocapitalize="off"
                       name="username"
                       type="text"
                       v-model="username"
                       aria-label="Enter your nickname"
                       placeholder="Enter your nickname"
                       autocomplete="off"
                       @keydown="join($event)"
                       autofocus />
               <div role="button"
                       tabindex="0"
                       @click="join()"
                       class="padding_0_1 pointer primary v-align-center h-align-center">
                       Join
               </div>
           </div>
        </section>
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
