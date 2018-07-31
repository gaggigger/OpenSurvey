Vue.component('app-dashboard-quiz-dashboard', {
    template: `
        <div>
            <h2>Results</h2>
            <div v-if="lastrun" class="surface padding_1 margin_1_0">
                <h3>Last run</h3>
                <app-dashboard-quiz-run-result
                    :event="event"
                    :quiz="quiz"
                    :quizrun="lastrun._id"
                ></app-dashboard-quiz-run-result>
            </div>
            <div v-for="(item, i) in items"
                :key="i">
                {{ quizdate(item.started_at) }}
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
        this.getAll();
    },
    data() {
        return {
            items: [],
            lastrun: null
        };
    },
    methods: {
        getAll() {
            EventService.get(this.event);
            QuizService.get(this.quiz);
            QuizRunService.getByEventAndQuid(this.event, this.quiz).then(quizRuns => {
                this.items = quizRuns.sort((a, b) => b.started_at - a.started_at);
                if(this.items[0]) {
                    this.lastrun = this.items[0];
                }
            });
        },
        quizdate(dt) {
            return (new Date(dt)).toLocaleString();
        }
    }
});
