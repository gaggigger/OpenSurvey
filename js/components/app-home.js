const R_HOME = Vue.component('app-home', {
    template: `
        <section class="app-home bg-norepeat flex_h-center flex_v-center">
            <div class="surface padding_1_0">
                <app-join></app-join>
                <footer class="background flex_v-center flex_h-center">
                    <span class="a-like" 
                        @click="authenticate()">
                        Login
                    </span>
                </footer>
            </div>
        </section>
    `,
    data: function() {
        return {

        };
    },
    methods: {
        authenticate: function () {
            this.$router.push('/login')
        }
    }
});
