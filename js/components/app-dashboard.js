const R_DASHBOARD = Vue.component('app-dashboard', {
    template: `
        <section class="padding_top_3">
            <header class="flex_h-center">
                <h3>DASHBOARD</h3>
            </header>
            <app-dashboard-event-new></app-dashboard-event-new>
            <app-dashboard-event-list></app-dashboard-event-list>
        </section>
    `,
    data: function () {
        return {

        };
    },
    created: function() {
        if (!Auth.getters.isLogged) {
            this.$router.push('/');
        }
    },
});
