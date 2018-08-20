Vue.component('app-dashboard-quiz-run-result', {
    template: `
        <div>
            
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
        },
        quizrun: {
            type: String,
            required: true
        }
    },
    created() {
        this.get();
    },
    data() {
        return {

        };
    },
    methods: {
        get() {
            QuizRunService.getByEventQuizAndRun(this.event, this.quiz, this.quizrun).then(response => {
                const result = response.responses.reduce((acc, item) => {
                    const key = item.user.login + '::' + item.user.provider;
                    if(!acc[key]) acc[key] = {
                        user: item.user.name,
                        score: 0,
                        duration: 0
                    };
                    if(item.correct === true) acc[key].score++;
                    acc[key].duration += item.response_duration;
                    return acc;
                }, {});
            });
        }
    }
});
