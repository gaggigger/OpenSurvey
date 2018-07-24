Vue.component('app-dashboard-event-new', {
    template: `
        <section class="padding_05_1 flex_h-center">
            <div class="bold font15 padding_0_1 v-align-center">#</div>
            <input autocorrect="off" 
                    autocapitalize="off" 
                    name="event" 
                    type="text" 
                    aria-label="Enter event code" 
                    placeholder="Enter event code" 
                    autocomplete="off"
                    v-model.trim="eventname"
                    @input="change"
                    @keydown="add($event)"
                    autofocus />
            <span
                role="button"
                tabindex="0"
                class="pointer primary join-button v-align-center h-align-center padding_0_1"
                @click="add()">
                Create Event
            </span>
        </section>
    `,
    data() {
        return {
            eventname: ''
        };
    },
    methods: {
        add(evt) {
            if(evt && evt.keyCode !== 13) return;
            if (!this.eventname) return false;
            this.eventname = this.eventname.replace(/^#/, '');
            if(/[^0-9a-z_@&]/i.test(this.eventname)) {
                return false;
            }
            const http = new Http();
            http.send('/event', 'POST', {
                name: this.eventname
            }).then((response) => {
                if(response && response._id) {
                    this.eventname = '';
                    this.$router.push({
                        name: 'event',
                        params: { event: response._id }
                    });
                } else {
                    this.$emit('itemAdded', response);
                }
            }).catch(function(err) {

            });
        },
        change() {
            this.$emit('change', this.eventname);
        }
    }
});
