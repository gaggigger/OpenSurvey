Vue.component('app-dashboard-quiz-dashboard', {
    template: `
        <div>
            <h2>Results</h2>
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

        };
    },
    methods: {
        getAll() {
            EventService.get(this.event);
            QuizService.get(this.quiz);
            QuizRunService.getByEventAndQuid(this.event, this.quiz).then(quizRuns => {
                console.log(quizRuns);
            });
        }
    }
});
