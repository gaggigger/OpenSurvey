const R_DASHBOARD_EVENT_LIST = Vue.component('app-dashboard-event-item', {
    template: `
        <section class="padding_top_3">
            <header>
                <h3>
                    #{{ item.name }},
                    <span class="nowrap">
                        from 
                        <input
                            type="datetime-local" 
                            v-model="datestart" 
                            name="datestart" />
                    </span>
                    <span class="nowrap">
                        to
                        <input 
                            type="datetime-local" 
                            v-model="dateend" 
                            name="dateend" />
                    </span>
                </h3>
            </header>
            <div>
                
            </div>
        </section>
    `,
    props: {
        event: {
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            item: {},
            datestart: '',
            dateend: ''
        };
    },
    created: function() {
        this.get();
    },
    methods: {
        get: function() {
            const http = new Http();
            http.send('/event/' + this.event, 'GET').then((response) => {
                this.item = response;
            }).catch(function(err) {
                // raf
            });
        }
    }
});
