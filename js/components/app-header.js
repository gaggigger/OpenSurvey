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
            return AuthStore.getters.authUser
            // Or return basket.getters.fruitsCount
            // (depends on your design decisions).
        }
    },
    data: function () {
        return {

        };
    }
});
