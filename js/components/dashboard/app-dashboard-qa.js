const R_DASHBOARD_QA = Vue.component('app-dashboard-qa', {
    template: `
        <section class="padding_top_3">
            <div class="relative">
                <common-event-connected-client
                    class="position-top-right font08 margin_1">
                </common-event-connected-client>
                <div v-for="(question, iq) in questions"
                    :key="iq"
                    class="flex border-bottom-width_1 padding_1"
                    :class="{ 'surface font18 margin-bottom_05': iq < 3 }">
                    <div class="flex-1">
                        <p>
                            {{ numlike(question) }}👍 | {{ question.question }}
                        </p>
                        <footer class="font08">
                            {{ question.owner }}, 
                            <span class="font08">
                                {{ questiondate(question.inserted_at) }}
                            </span>
                        </footer>
                    </div>
                    <div class="padding_0_1 flex_v-center">
                        <b class="a-like pointer" title="Mark as answered" @click="answered(question)">✅</b>
                    </div>
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
    created() {
        this.getEvent();
        this.get();
        SocketService.room(this.event);
        SocketService.on('event-question-modified', this.updateQuestion, 'app-dashboard-event-question-modified');
    },
    data() {
        return {
            questions: []
        };
    },
    methods: {
        getEvent() {
            EventService.get(this.event).then(response => {
                // raf?
            });
        },
        order(data) {
            data.sort((a,b) => {
                if(!a.likes && !b.likes) return 0;
                if(!a.likes) return 1;
                if(!b.likes) return -1;
                if(b.likes.length === a.likes.length) {
                    return (new Date(a.inserted_at)).getTime() - (new Date(b.inserted_at)).getTime();
                }
                return b.likes.length - a.likes.length;
            });
            return data.filter(item => !item.answered);
        },
        get() {
            QuestionService.getAll(this.event).then(response => {
                this.questions = this.order(response);
            });
        },
        numlike(question) {
            if(question.likes) {
                return question.likes.length;
            }
            return 0;
        },
        questiondate(dt) {
            return (new Date(dt)).toLocaleString();
        },
        answered(question) {
            QuestionService.answered(question).then(response => {
                this.questions.map(question => {
                    if(question._id === response._id && response.answered) {
                        question.answered = true;
                    }
                });
                this.questions = this.questions.filter(item => !item.answered);
                this.$forceUpdate();
            });
        },
        updateQuestion(data) {
            this.questions = this.order(QuestionService.updateList(this.questions, data));
            this.$forceUpdate();
        }
    }
});
