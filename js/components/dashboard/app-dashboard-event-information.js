Vue.component('app-dashboard-event-information', {
    template: `
        <md-card>
            <md-card-header>
                <md-field>
                    <label>Event description</label>
                    <md-input 
                        type="text" 
                        v-model.trim="item.description" 
                        @input="save"
                        class="sw100 border-no" />
                </md-field>
            </md-card-header>
            <md-card-content>
                <div class="h-align-center md-accent">
                    Event will be available between these dates
                </div>
                <div class="flex_wrap flex_h-center">
                    <span class="nowrap">
                        <md-field>
                            <label>From</label>
                            <md-input
                                type="datetime-local" 
                                v-model="item.datestart" 
                                @change="save"
                                name="datestart" />
                        </md-field>
                    </span>
                    &nbsp;
                    <span class="nowrap">
                        <md-field>
                            <label>to</label>
                            <md-input 
                                type="datetime-local" 
                                v-model="item.dateend" 
                                @change="save"
                                name="dateend" />
                        </md-field>
                    </span>
                </div>
                <div>&nbsp;</div>
            </md-card-content>
        </md-card>
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
            EventService.get(this.event).then(response => {
                this.item = this.formatEvent(response);
            });
        },
        save() {
            if (this.tOut) window.clearTimeout(this.tOut);
            this.tOut = window.setTimeout(() => {
                (new Http()).send('/event/' + this.event, 'POST', {
                    description: this.item.description,
                    datestart: Date.parse(this.item.datestart),
                    dateend: Date.parse(this.item.dateend)
                }).then(response => {
                    this.item = this.formatEvent(response);
                }).catch(function(err) {
                    // raf
                });
            }, 300);
        }
    }
});
