const R_DASHBOARD_QUIZ_VIEW_QUESTION = Vue.component('app-dashboard-quiz-view-question', {
    template: `
        <div>
            <div class="padding_05_1">
                <app-dashboard-quiz-play :event="event" 
                        :quiz="quiz"
                        @start="questionStart"
                        @end="questionEnd"
                        class="flex-1"></app-dashboard-quiz-play>
            </div>
            <div class="padding_0_1" v-if="question !== null">
                <header>
                    <h3>{{ question.name }}</h3>
                </header>
                <ul class="list-1 ">
                    <li v-for="(item, i) in question.response"
                        :key="i"
                        @click="respond(item)"
                        class="flex border-width_1 border-radius_5px margin_1 padding_1">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
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
            question: null,
            startTimeout: null
        };
    },
    created() {
        this.getAll();
        SocketService.on('event-quiz-question', (response) => {
            if(response.quiz === this.quiz) {
                this.question = response.question;
                this.$forceUpdate();
            }
        }, 'app-dashboard-quiz-view-question-' + this.quiz);

        SocketService.room(this.event);
    },
    computed: {

    },
    methods: {
        getAll() {
            EventService.get(this.event);
            QuizService.get(this.quiz);
        },
        questionStart() {
            window.clearTimeout(this.startTimeout);
        },
        questionEnd() {
            this.question = null;
            this.$emit('end');
            this.startTimeout = window.setTimeout(() => {
                this.$router.push({
                    name: 'eventquizitem',
                    params: {
                        event: this.event,
                        quiz: this.quiz
                    }
                });
            }, 2000);
        }
    }
});
