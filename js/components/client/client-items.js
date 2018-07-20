Vue.component('client-items', {
    template: `
        <section class="padding_1">
            <router-link :to="{ name: 'client-ask-question', params:{ event: event }}">
                <div class="border-width_1 border-radius_5px background-hover pointer margin_1 padding_1">
                    Ask questions
                </div>
            </router-link>
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

    }
});
