const R_CLIENT_QUIZ = Vue.component('client-quiz', {
    template: `
        <section class="padding_top_3">
            <div class="margin_1 relative">
                <common-event-connected-client
                    class="position-top-right font08 margin_1">
                </common-event-connected-client>
                <header>
                    <h2>{{ question.name }}</h2>
                </header>
                <ul class="list-1 ">
                    <li v-for="(item, i) in question.response"
                        :key="i"
                        @click="respond(item)"
                        class="flex border-width_1 border-radius_5px background-hover pointer margin_1 padding_1">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </section>
    `,
    props: {
        event: {
            type: String,
            required: true
        },
        quizrun: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            question: {}
        };
    },
    created() {
        console.log(1);
        if(!Auth.getters.isLogged) {
            this.$router.push({ name: 'home', params: {
                event: this.event
            }});
            return true;
        }
        this.get();
        SocketService.room(this.event);
        // Watch for question start
        SocketService.on('event-quiz-question', (response) => {
            console.log(response);
            this.question = response.question;
        });
    },
    methods: {
        get() {
            QuizRunService.getQuizStep(this.event, this.quizrun)
                .then(response => {
                    this.question = response.question;
                });
        },
        respond(question) {
            QuizRunService.respond(this.event, this.quizrun, question);
        }
    }
});
