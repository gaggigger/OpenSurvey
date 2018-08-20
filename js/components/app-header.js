Vue.component('app-header', {
    template: `
        <md-toolbar class="flex_v-center">
            <div class="md-title">
                <app-breadcrumb></app-breadcrumb>
            </div>
            <div class="md-toolbar-section-end">
                <common-event-connected-client></common-event-connected-client>
                <app-user-logged></app-user-logged>
            </div>
       </md-toolbar>
    `,
    computed: {
        user () {
            return Auth.getters.authUser
        }
    },
    data() {
        return {

        };
    }
});
