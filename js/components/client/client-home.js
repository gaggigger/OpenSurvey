const R_CLIENT_HOME = Vue.component('client-home', {
    template: `
        <section class="padding_top_3">
            <header class="surface padding_1">
                <h2>#{{ item.name }}</h2>
                <div>
                    {{ item.description }}, {{ datestart }}
                </div>
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
        io.connect(Config.api.url);
    },
    methods: {
        getEvent() {
            EventService.get(this.event).then(response => {
                this.item = response;
                console.log(this.item);
            });
        }
    }
});
