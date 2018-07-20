const R_DASHBOARD_QA = Vue.component('app-dashboard-qa', {
    template: `
        <section class="padding_top_3">
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
        socket.emit('event-room', this.event);
        socket.on('event-question-like', this.updateQuestion);
        socket.on('event-question-added', this.updateQuestion);
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
        orderQuestion(data) {
            data.sort((a,b) => {
                if(!a.likes && !b.likes) return 0;
                if(!a.likes) return 1;
                if(!b.likes) return -1;
                return b.likes.length - a.likes.length;
            });
            return data.filter(item => !item.answered);
        },
        get() {
            QuestionService.getAll(this.event).then(response => {
                this.questions = this.orderQuestion(response);
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
            this.get();
            /*
            this.questions = this.questions.map(question => {
                if(question._id === data._id) {
                    question = data;
                }
                return question;
            });
            this.$forceUpdate();
            */
        }
    }
});
