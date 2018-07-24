const R_CLIENT_QUIZ = Vue.component('client-quiz', {
    template: `
        <section class="padding_top_3">
           QUIZZZZZZZ
        </section>
    `,
    props: {
        event: {
            type: String,
            required: true
        },
        quiz: {
            type: String,
            required: true
        }
    },
    data() {
        return {

        };
    },
    created() {
        if(!Auth.getters.isLogged) {
            this.$router.push({ name: 'home', params: {
                event: this.event
            }});
        }
    },
    methods: {

    }
});
