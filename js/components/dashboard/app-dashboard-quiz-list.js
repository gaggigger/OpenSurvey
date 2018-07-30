const R_DASHBOARD_QUIZ_LIST = Vue.component('app-dashboard-quiz-list', {
    template: `
        <div class="padding_top_3">
            <app-dashboard-quiz-new
                @change="change" 
                :event="event"></app-dashboard-quiz-new>
            
            <ul class="list-1">
                <li v-for="item in filterItem" 
                    class="flex border-width_1 border-radius_5px background-hover pointer margin_1 padding_1">
                    <span class="flex-1" @click="goto(event, item._id)">{{ item.name }}</span>
                </li>
            </ul>
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
        this.get();
        SocketService.room(this.event);
    },
    data() {
        return {
            items: [],
            quizName: ''
        };
    },
    computed: {
        filterItem() {
            return this.items.filter(item => {
                if(this.quizName === '') return true;
                return item.name.toLowerCase().indexOf(this.quizName.toLowerCase()) >= 0;
            });
        }
    },
    methods: {
        goto(event, quizId) {
            this.$router.push({
                name: 'eventquizitem',
                params:{ event: event, quiz: quizId }
            });
        },
        getEvent() {
            EventService.get(this.event).then(response => {
                // raf?
            });
        },
        get() {
            QuizService.getAllForEvent(this.event).then(response => {
                this.items = response;
            }).catch(function(err) {
                // raf
            });
        },
        change(text) {
            this.quizName = text;
        }
    }
});
