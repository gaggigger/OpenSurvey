const R_DASHBOARD = Vue.component('app-dashboard', {
    template: `
        <section class="padding_top_3">
            <header class="flex_h-center">
                <h3>DASHBOARD</h3>
            </header>
            <app-dashboard-event-new @itemAdded="reloadList" @change="change"></app-dashboard-event-new>
            <app-dashboard-event-list :filter="filterText" :reload="itemAdded"></app-dashboard-event-list>
        </section>
    `,
    data() {
        return {
            itemAdded: null,
            filterText: ''
        };
    },
    created() {
        if (!Auth.getters.isLogged) {
            this.$router.push({ name: 'home' });
        }
    },
    methods: {
        reloadList(item) {
            this.itemAdded = item;
        },
        change(text) {
            this.filterText = text;
        }
    }
});
