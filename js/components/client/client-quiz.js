const R_CLIENT_QUIZ = Vue.component('client-quiz', {
    template: `
        <div class="page">
            <section>
                <div class="margin_1 relative">
                    <div v-if="question.name">
                        <header>
                            <h2>{{ question.name }}</h2>
                        </header>
                        <md-progress-bar md-mode="determinate" :md-value="questionTime"></md-progress-bar>
                        <ul class="list-1 ">
                            <li v-for="(item, i) in question.response"
                                :key="i"
                                @click="respond(item)"
                                class="flex border-width_1 border-radius_5px background-hover pointer margin_1 padding_1"
                                :class="{ 'background': currentResponse === item.uid }">
                                {{ item.name }}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
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
            question: {},
            currentQuestion: null,
            currentResponse: null,
            questionInterval: null,
            questionTime: 0
        };
    },
    created() {
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
            if(response.quizrun === this.quizrun) {
                if(this.currentQuestion !== response.current_question) {
                    this.currentQuestion = response.current_question;
                    this.question = response.question;

                    this.questionTime = 0;
                    window.clearInterval(this.questionInterval);

                    let numSec = 0;
                    this.questionInterval = window.setInterval(() => {
                        ++numSec;
                        this.questionTime = numSec * 100 / parseInt(this.question.duration);
                    }, 1000);
                }
                this.$forceUpdate();
            }
        }, 'client-quiz-event-quiz-question-' + this.quizrun);

        SocketService.on('event-quiz-question-end', (quizrun) => {
            this.question = {
                name: 'End of the quiz, thank you'
            };
            setTimeout(() => {
                this.$router.push({ name: 'home', params: {
                        event: this.event
                    }});
            }, 2000);
        }, 'client-quiz-event-quiz-question-end');

    },
    methods: {
        get() {
            QuizRunService.getQuizStep(this.event, this.quizrun)
                .then(response => {
                    this.currentQuestion = response.current_question;
                    this.question = response.question;
                });
        },
        respond(question) {
            QuizRunService.respond(this.event, this.quizrun, question)
                .then(response => {
                    this.currentResponse = response.response;
                });
        }
    }
});
