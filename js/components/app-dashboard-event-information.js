Vue.component('app-dashboard-event-information', {
    template: `
        <div>
            <h3 class="margin_05_1">
                <router-link to="/dashboard">
                    dashboard
                </router-link>
                /
                <span>#{{ item.name }}</span>
            </h3>
            <div>
                <input 
                    type="text" 
                    placeholder="Description"
                    v-model.trim="item.description" 
                    @change="save"
                    class="sw100 border-no" />
            </div>
            <div>
                <div class="font08 flex_h-center">
                    <i>Event will be available between these dates</i>
                </div>
                <div class="flex_wrap flex_h-center">
                    <span class="nowrap">
                        <b>from</b>
                        <input
                            type="datetime-local" 
                            v-model="item.datestart" 
                            @change="save"
                            name="datestart" />
                    </span>
                    &nbsp;
                    <span class="nowrap">
                        <b>to</b>
                        <input 
                            type="datetime-local" 
                            v-model="item.dateend" 
                            @change="save"
                            name="dateend" />
                    </span>
                </div>
                <div>&nbsp;</div>
            </div>
        </div>
    `,
    props: {
        event: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            item: {
                description: '',
                datestart: '',
                dateend: ''
            }
        };
    },
    created() {
        this.get();
    },
    methods: {
        formatEvent(event) {
            if(event.datestart) event.datestart = DateHelpers.isoFromTimestamp(event.datestart);
            if(event.dateend) event.dateend = DateHelpers.isoFromTimestamp(event.dateend);
            return event;
        },
        get() {
            (new Http()).send('/event/' + this.event, 'GET').then(response => {
                this.item = this.formatEvent(response);
            }).catch(function(err) {
                // raf
            });
        },
        save() {
            if (this.tOut) window.clearTimeout(this.tOut);
            this.tOut = window.setTimeout(() => {
                (new Http()).send('/event/' + this.event, 'POST', {
                    description: this.item.description.trim(),
                    datestart: Date.parse(this.item.datestart),
                    dateend: Date.parse(this.item.dateend)
                }).then(response => {
                    this.item = this.formatEvent(response);
                }).catch(function(err) {
                    // raf
                });
            }, 1000);
        }
    }
});
