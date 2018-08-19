Vue.component('client-items', {
    template: `
        <section class="padding_1">
            <md-button class="md-primary md-raised" @click="goto">
                Ask questions
            </md-button>
            <client-questions :event="event"></client-questions>
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

    },
    created() {

    },
    methods: {
        goto() {
            this.$router.push({
                name: 'client-ask-question',
                params:{ event: this.event }
            });
        }
    }
});
