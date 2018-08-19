const R_DASHBOARD_QUIZ = Vue.component('app-dashboard-quiz', {
    template: `
        <div>
            <md-toolbar :md-elevation="1">
                <app-dashboard-quiz-play :event="event" 
                    :quiz="quiz"
                    @start="startQuiz"
                    @end="questionEnd"
                    class="flex-1"></app-dashboard-quiz-play>
                <router-link :to="{ name: 'eventquizitemedit', params:{ event: event, quiz: quiz }}">
                    <md-button class="md-primary" title="Edit quiz">
                        Edit
                        <md-icon>create</md-icon>
                    </md-button>
                </router-link>
            </md-toolbar>
            <div class="padding_1">
                <app-dashboard-quiz-dashboard :event="event" :quiz="quiz"></app-dashboard-quiz-dashboard>
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
        SocketService.room(this.event);
    },
    data() {
        return {

        };
    },
    methods: {
        getAll() {
            EventService.get(this.event);
            QuizService.get(this.quiz);
        },
        startQuiz() {
            this.$router.push({
                name: 'eventquizviewquestion',
                params: {
                    event: this.event,
                    quiz: this.quiz
                }
            });
        },
        questionEnd() {

        }
    }
});
