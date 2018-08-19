Vue.component('client-questions', {
    template: `
        <div>
            <md-list v-for="(question, iq) in questions"
                :key="iq"
                :class="{ 'disabled-color': question.answered === true }">
                
                <md-subheader>
                    <span class="font15">{{ question.question }}</span>
                </md-subheader>
                
                <md-list-item>
                    <div>
                        <div class="pointer display-inline-block"
                            @click="up(question)"
                            :class="{ 'primary-font': questionliked(question) }"
                            v-if="question.answered !== true">
                            <md-icon>thumb_up_alt</md-icon>
                        </div>
                        <md-chip class="md-primary" v-if="numlike(question)">{{ numlike(question) }}</md-chip>
                    </div>
                    <div>
                        <md-chip class="md-disabled">{{ question.owner }}</md-chip>
                        <md-chip class="md-disabled">{{ questiondate(question.inserted_at) }}</md-chip>
                        </span>
                    </div>
                </md-list-item>
                <md-divider></md-divider>
            </md-list>
        </div>
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
