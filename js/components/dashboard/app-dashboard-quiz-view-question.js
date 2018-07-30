Vue.component('app-dashboard-quiz-view-question', {
    template: `
        <div>
            <div v-if="question !== null">
                <header>
                    <h2>{{ question.name }}</h2>
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
            question: null
        };
    },
    created() {
        SocketService.on('event-quiz-question', (response) => {
            if(response.quiz === this.quiz) {
                this.question = response.question;
                this.$forceUpdate();
            }
        }, 'app-dashboard-quiz-view-question-' + this.quiz);

        SocketService.on('event-quiz-question-end', (quizrun) => {
            if(quizrun.quiz === this.quiz) {
                this.question = null;
                this.$emit('end');
            }
        }, 'app-dashboard-quiz-view-question-end' + this.quiz);
    },
    computed: {

    },
    methods: {

    }
});
