Vue.component('app-header', {
    template: `
        <header class="app-header flex_v-center background-inversed">
            <app-breadcrumb></app-breadcrumb>
            <app-user-logged></app-user-logged>
       </header>
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
