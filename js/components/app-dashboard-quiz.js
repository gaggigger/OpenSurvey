const R_DASHBOARD_QUIZ = Vue.component('app-dashboard-quiz', {
    template: `
        <div class="padding_top_3">
            <app-dashboard-quiz-new  :event="event"></app-dashboard-quiz-new>
       </div>
    `,
    props: {
        event: {
            type: String,
            required: true
        }
    },
    created() {
        this.getEvent();
    },
    data() {
        return {
            items: []
        };
    },
    methods: {
        getEvent() {
            EventService.get(this.event).then(response => {
                // raf?
            });
        },
        get() {
            QuizService.getAll().then((response) => {
                this.items = response;
            }).catch(function(err) {
                // raf
            });
        }
    }
});
