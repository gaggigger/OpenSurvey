const R_DASHBOARD_QUIZ = Vue.component('app-dashboard-quiz-item', {
    template: `
        <div class="padding_top_3">
            <h3 class="h-align-center">
                Quiz: {{ item.name }}
            </h3>
            <div>
                <div v-for="question in item.questions"
                    class="border-width_1 margin_05_1"
                    contenteditable="true">
                    <div class="surface padding_05_1">{{ question.name }}</div>
                    <div class="padding_05_1">
                        Items
                    </div>
                </div>
            </div>
            <div>
                <div class="padding_05_1 flex_h-center">
                    <input autocorrect="off" 
                            autocapitalize="off" 
                            name="quiz" 
                            type="text" 
                            aria-label="Add new question" 
                            placeholder="Add new question" 
                            autocomplete="off"
                            v-model.trim="newQuestionName"
                            class="flex-1"
                            autofocus />
                    <span
                        role="button"
                        tabindex="0"
                        class="pointer primary join-button v-align-center h-align-center padding_0_1"
                        @click="add">
                        +
                    </span>
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
        this.getAll();
    },
    data() {
        return {
            item: {
                questions: []
            },
            newQuestionName: ''
        };
    },
    methods: {
        initResponse(item) {
            const quiz = Object.assign({}, item);
            if(! quiz.questions) {
                quiz.questions = [];
            }
            return quiz;
        },
        getAll() {
            EventService.get(this.event).then(response => {
                // raf?
            });
            QuizService.get(this.quiz).then(response => {
                this.item = this.initResponse(response);
            });
        },
        add() {
            this.item.questions.push({
                name: this.newQuestionName
            });
            this.newQuestionName = '';
        }
    }
});
