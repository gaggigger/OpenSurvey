Vue.component('client-questions', {
    template: `
        <section class="padding_1">
            <div v-for="(question, iq) in questions"
                :key="iq"
                class="flex border-bottom-width_1"
                :class="{ 'disabled-color': question.answered === true }">
                <div class="padding_0_1 flex_v-center"
                    :class="{ 'primary-font': questionliked(question) }">
                    <div>
                        <b class="a-like pointer font15"
                         @click="up(question)"
                         v-if="question.answered !== true"
                         >👍</b>
                        <div>{{ numlike(question) }}</div>
                    </div>
                </div>
                <div class="flex-1">
                    <p>
                        {{ question.question }}
                    </p>
                    <footer class="font08">
                        {{ question.owner }}, 
                        <span class="font08">
                            {{ questiondate(question.inserted_at) }}
                        </span>
                    </footer>
                </div>
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
            questions: []
        };
    },
    created() {
        this.get();
        SocketService.on('event-question-modified', this.updateQuestion, 'client-question-event-question-modified');
    },
    methods: {
        order(questions) {
            return [...questions].sort((a,b) => {
                return (new Date(a.inserted_at)).getTime() - (new Date(b.inserted_at)).getTime();
            });
        },
        questionliked(question) {
            if(!question.likes) return false;
            if(question.answered) return false;
            return question.likes.indexOf(Auth.getters.authUser.login) !== -1;
        },
        updateQuestion(data) {
            this.questions = this.order(QuestionService.updateList(this.questions, data));
            this.$forceUpdate();
        },
        numlike(question) {
            if(question.likes) {
                return question.likes.length;
            }
            return '';
        },
        questiondate(dt) {
            return (new Date(dt)).toLocaleString();
        },
        get() {
            if(Auth.getters.isLogged) {
                QuestionService.getAll(this.event).then(response => {
                    this.questions = this.order(response);
                });
            }
        },
        up(question) {
            QuestionService.like(question);
        }
    }
});
