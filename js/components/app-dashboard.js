const R_DASHBOARD = Vue.component('app-dashboard', {
    template: `
        <section class="padding_top_3">
            <header class="flex_h-center">
                <h3>DASHBOARD</h3>
            </header>
            <app-dashboard-event-new></app-dashboard-event-new>
        </section>
    `,
    data: function () {
        return {

        };
    }
});
