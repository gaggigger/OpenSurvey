Vue.component('app-header', {
    template: `
        <header class="app-header flex_v-center background-inversed">
            <div class="text-logo">
                <router-link to="/">OpenSurvey</router-link>
            </div>
            <app-user-logged></app-user-logged>
       </header>
    `,
    computed: {
        user () {
            return Auth.getters.authUser
        }
    },
    data: function () {
        return {

        };
    }
});
