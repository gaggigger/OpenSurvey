Vue.component('app-dashboard-event-new', {
    template: `
        <section class="padding_05_1 flex_h-center">
            <div class="bold font15 padding_0_1 v-align-center">#</div>
            <input autocorrect="off" 
                    autocapitalize="off" 
                    name="search" 
                    type="text" 
                    aria-label="Enter event code" 
                    placeholder="Enter event code" 
                    autocomplete="off"
                    v-model="eventname"
                    autofocus />
            <a href="#" 
                class="primary join-button v-align-center h-align-center padding_0_1"
                @click="add">
                Create new Event
            </a>
        </section>
    `,
    data: function() {
        return {
            eventname: ''
        };
    },
    methods: {
        add: function() {
            if (!this.eventname) return false;
            const http = new Http();
            http.send('/event', 'POST', {
                name: this.eventname
            }).then((response) => {
                console.log(response);
            }).catch(function(err) {

            });
        }
    }
});
