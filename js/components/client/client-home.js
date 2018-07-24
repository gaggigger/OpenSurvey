const R_CLIENT_HOME = Vue.component('client-home', {
    template: `
        <section class="padding_top_3">
            <header class="surface padding_1 relative">
                <h2 class="margin_0_1">
                    #{{ item.name }},
                    <span v-if="item.description">
                        {{ item.description }}
                    </span>
                </h2>
                <common-event-connected-client
                    class="position-top-right font08 margin_1">
                </common-event-connected-client>
            </header>
            <client-items :event="event"></client-items>
        </section>
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
        SocketService.quizWatcher(this);
        socket.emit('event-room', this.event);
    },
    methods: {
        getEvent() {
            EventService.get(this.event).then(response => {
                this.item = response;
            });
        }
    }
});
