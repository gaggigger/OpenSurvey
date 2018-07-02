const R_DASHBOARD_EVENT_LIST = Vue.component('app-dashboard-event-item', {
    template: `
        <section class="padding_top_3">
            ITEM
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
            items: []
        };
    },
    created: function() {
        this.get();
    },
    methods: {
        get: function() {

        }
    }
});
