Vue.component('client-items', {
    template: `
        <section class="padding_1">
            <router-link :to="{ name: 'client-qa', params:{ event: event }}">
                <div class="border-width_1 border-radius_5px background-hover pointer margin_1 padding_1">
                    Ask questions
                </div>
            </router-link>
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
