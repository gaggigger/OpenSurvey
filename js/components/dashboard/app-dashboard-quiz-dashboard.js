Vue.component('app-dashboard-quiz-dashboard', {
    template: `
        <div>
            <h2>Results</h2>
            <div v-for="item in items">
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
            items: []
        };
    },
    methods: {
        getAll() {
            EventService.get(this.event);
            QuizService.get(this.quiz);
            QuizRunService.getByEventAndQuid(this.event, this.quiz).then(quizRuns => {
                this.items = quizRuns.sort((a, b) => b.started_at - a.started_at);
            });
        },
        quizdate(dt) {
            return (new Date(dt)).toLocaleString();
        }
    }
});
