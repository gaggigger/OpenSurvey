Vue.component('client-questions', {
    template: `
        <section class="padding_1">
            <div v-for="(question, iq) in questions"
                :key="iq"
                class="flex border-bottom-width_1">
                <div class="padding_0_1 flex_v-center"
                    :class="{ 'primary-font': questionliked(question) }">
                    <div>
                        <b class="a-like pointer" @click="up(question)">👍</b>
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
        socket.removeListener('event-question-like', this.updateQuestionLike);
        socket.on('event-question-like', this.updateQuestionLike);
    },
    methods: {
        questionliked(question) {
            if(!question.likes) return false;
            return question.likes.indexOf(Auth.getters.authUser.login) !== -1;
        },
        updateQuestionLike(data) {
            this.questions.map(question => {
                if(question._id === data._id) {
                    question.likes = data.likes;
                    this.$forceUpdate();
                }
            });
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
            QuestionService.getAll(this.event).then(response => {
                this.questions = response;
            });
        },
        up(question) {
            QuestionService.like(question).then(response => {
                // raf
            });
        }
    }
});
