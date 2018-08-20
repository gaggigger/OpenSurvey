Vue.component('app-join', {
    template: `
        <div class="padding_05_1 flex_h-center">
            <md-field>
                <label>Event code</label>
                <md-input autocorrect="off" 
                    autocapitalize="off" 
                    name="search" 
                    type="text" 
                    v-model="event"
                    aria-label="Enter event code" 
                    autocomplete="off" 
                    @keydown="join($event)"
                    autofocus
                />
            </md-field>
            <md-button
                @click="join()"
                class="pointer md-raised md-primary">
                JOIN
            </md-button>
        </div>
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
