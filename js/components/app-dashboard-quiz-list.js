const R_DASHBOARD_QUIZ_LIST = Vue.component('app-dashboard-quiz', {
    template: `
        <div class="padding_top_3">
            <app-dashboard-quiz-new :event="event"></app-dashboard-quiz-new>
            
            <ul class="list-1 flex flex_h-center flex_v-center">
                <li v-for="item in items" 
                    class="surface margin_1 padding_05_1">
                    <router-link :to="{ name: 'eventquizitem', params:{ event: event, quiz: item._id }}">
                        <a>{{ item.name }}</a>
                    </router-link>
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
            QuizService.getAllForEvent(this.event).then((response) => {
                this.items = response;
            }).catch(function(err) {
                // raf
            });
        }
    }
});
