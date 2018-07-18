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
                    @keydown="join($event)"
                    autofocus />
            <span
                role="button"
                tabindex="0" 
                @click="join()"
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
        join(evt) {
            if(evt && evt.keyCode !== 13) {
                return;
            }
            EventService.findByName(this.event).then((function(event) {
                if(!event) {
                    alert("Event "+ this.event +" doesn't exist");
                    return false;
                }
                window.location.href = './event.html#/' + event._id;
            }).bind(this));
        }
    }
});
