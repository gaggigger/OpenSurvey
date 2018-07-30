Vue.component('app-dashboard-quiz-play', {
    template: `
        <div>
            <span v-if="!item.quizrun" 
                title="Start quiz" 
                @click="run()" 
                class="pointer a-like">Start ▶</span>
            <div v-if="item.quizrun">
                <span>Started at {{ quizdate(item.quizrun.started_at) }}, Question {{ step() }}</span>
                <div>
                    <span
                        title="Start quiz" 
                        @click="stop()" 
                        class="pointer a-like">Stop ■</span>
                </div>
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
    created() {
        this.get();

        // Update step
        SocketService.on('event-quiz-question', (response) => {
            if(response.quiz === this.item._id) {
                if(this.item.questions && this.item.questions.length && this.item.quizrun) {
                    this.item.quizrun.current_question = response.current_question;
                }
                this.$forceUpdate();
            }
        }, 'client-quiz-event-quiz-question-' + this.quizrun);

        // Remove quizrun
        SocketService.on('event-quiz-question-end', (quizrun) => {
            if(quizrun.quiz === this.item._id) {
                delete this.item.quizrun;
                this.$forceUpdate();
                this.$emit('end');
            }
        }, 'app-dashboard-event-quiz-question-end');
    },
    data() {
        return {
            item: {}
        };
    },
    computed: {

    },
    methods: {
        get() {
            QuizService.get(this.quiz).then(response => {
                this.item = response;
            });
        },
        quizdate(dt) {
            return (new Date(dt)).toLocaleString();
        },
        run() {
            QuizService.run(this.event, this.item._id).then(quizrun => {
                this.item.quizrun = quizrun;
                this.$forceUpdate();
                this.$emit('start');
            });
        },
        stop() {
            QuizService.stop(this.event, this.item._id);
        },
        step() {
            if(this.item.questions && this.item.quizrun) {
                return (this.item.quizrun.current_question + 1) + '/' + this.item.questions.length;
            } else {
                return '';
            }
        }
    }
});
