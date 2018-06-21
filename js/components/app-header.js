Vue.component('app-header', {
    template: `
        <header class="app-header flex_v-center primary-inversed">
            <div class="text-logo">
                <router-link to="/">OpenSurvey</router-link>
            </div>
            {{ user.name }}
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
