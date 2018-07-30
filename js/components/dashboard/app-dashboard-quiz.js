const R_DASHBOARD_QUIZ = Vue.component('app-dashboard-quiz', {
    template: `
        <div class="padding_top_3">
            <div class="padding_1 surface flex">
                <app-dashboard-quiz-play :event="event" 
                    :quiz="quiz"
                    @start="startQuiz"
                    @end="questionEnd"
                    class="flex-1"></app-dashboard-quiz-play>
                <router-link :to="{ name: 'eventquizitemedit', params:{ event: event, quiz: quiz }}">
                        <span title="Edit quiz">Edit</span>
                </router-link>
            </div>
            <div class="padding_1" v-show="showQuestion">
                <app-dashboard-quiz-view-question :event="event" :quiz="quiz" @end="questionEnd"></app-dashboard-quiz-view-question>
            </div>
            <div class="padding_1" v-if="showDashboard">
                <app-dashboard-quiz-dashboard :event="event" :quiz="quiz"></app-dashboard-quiz-dashboard>
            </div>
            <common-event-connected-client></common-event-connected-client>
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
            showQuestion: false,
            showDashboard: true
        };
    },
    methods: {
        getAll() {
            EventService.get(this.event);
            QuizService.get(this.quiz);
        },
        startQuiz() {
            this.showQuestion = true;
            this.showDashboard = false;
        },
        questionEnd() {
            this.showQuestion = false;
            this.showDashboard = true;
        }
    }
});
