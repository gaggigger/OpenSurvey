Vue.component('app-join', {
    template: `
        <section class="app-join padding_05_1 flex_h-center">
            <div class="join-prefix bold font15 padding_0_1 v-align-center">#</div>
            <input autocorrect="off" 
                    autocapitalize="off" 
                    name="search" 
                    type="text" 
                    v-model="event"
                    aria-label="Enter event code" 
                    placeholder="Enter event code" 
                    autocomplete="off" 
                    autofocus />
            <span
                role="button"
                tabindex="0" 
                @click="join"
                class="pointer primary join-button v-align-center h-align-center">
                Join
            </span>
        </section>
    `,
    data() {
        return {
            event: ''
        };
    },
    methods: {
        join() {
            window.location.href = window.location.origin
                + window.location.pathname
                + 'event.html?'
                + 'code=' + encodeURIComponent(this.event);
        }
    }
});
