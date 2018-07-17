const R_CLIENT_HOME = Vue.component('client-home', {
    template: `
        <section class="surface padding_top_3">
            <h2>HELLO</h2>
            <div class="flex_h-center padding_1">
                {{ event }}    
            </div>
        </section>
    `,
    props: {
        event: {
            type: String,
            required: true
        }
    },
    data() {
        return {
        };
    },
    created() {
        if(! Auth.getters.isLogged) {
            this.$router.push({ name: 'identification', params: {
                event: this.event
            }});
        }
    },
    methods: {

    }
});
