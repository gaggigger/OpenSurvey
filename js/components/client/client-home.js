const R_CLIENT_HOME = Vue.component('client-home', {
    template: `
        <div class="page">
            <section>
                <md-card>
                    <md-card-header>
                        <md-card-header-text>
                            <div class="md-title">
                                #{{ item.name }},
                                <span v-if="item.description">
                                    {{ item.description }}
                                </span>
                            </div>
                        </md-card-header-text>
                    </md-card-header>
                </md-card>
                <client-items :event="event"></client-items>
            </section>
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
            item: {}
        };
    },
    computed: {
        datestart() {
            if(! this.item.datestart) return '-';
            return (new Date(this.item.datestart)).toLocaleDateString();
        }
    },
    created() {
        if(! Auth.getters.isLogged) {
            this.$router.push({ name: 'identification', params: {
                event: this.event
            }});
            return;
        }
        this.getEvent();
        SocketService.room(this.event);
    },
    methods: {
        getEvent() {
            EventService.get(this.event).then(response => {
                this.item = response;
            });
        }
    }
});
