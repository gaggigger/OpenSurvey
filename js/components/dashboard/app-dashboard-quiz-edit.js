const R_DASHBOARD_QUIZ_EDIT = Vue.component('app-dashboard-quiz-edit', {
    template: `
        <div class="page">
            <div class="app-dashboard-quiz-item">
                <div class="flex_h-center flex_v-center padding_1">
                    <md-field>
                        <label>Quiz name</label>
                        <md-input autocorrect="off" 
                            autocapitalize="off" 
                            type="text" 
                            aria-label="Quiz name" 
                            autocomplete="off"
                            v-model.trim="item.name"
                            @keydown="saveQuestion($event)" />
                    </md-field> 
                    <md-button
                        role="button"
                        tabindex="0"
                        class="pointer md-primary"
                        title="Save question"
                        @click="saveQuestion()">
                        <md-icon>save</md-icon>
                    </md-button>    
                </div>
                <div>
                    <md-card v-for="(question, iq) in item.questions"
                        :key="iq"
                        class="margin_05_1 relative">
                        <md-card-content>
                            <div class="position-top-right padding_05_1">
                                <span class="pointer a-like font08"
                                    title="Show responses"
                                    v-if="question.collapse === true"
                                    @click="showQuestion(question)">
                                    <md-icon>keyboard_arrow_right</md-icon>
                                </span>
                                <span class="pointer a-like font08"
                                    title="Hide responses"
                                    v-if="question.collapse !== true"
                                    @click="hideQuestion(question)">
                                    <md-icon>keyboard_arrow_down</md-icon>
                                </span>                            
                                <span class="pointer a-like font08"
                                    v-if="iq > 0"
                                    title="Move this question one step down"
                                    @click="moveQuestion('up', item.questions, iq);">
                                    <md-icon>arrow_upward</md-icon>
                                </span>
                                <span class="pointer a-like font08" 
                                    v-if="iq < item.questions.length - 1"
                                    title="Move this question one step up"
                                    @click="moveQuestion('down', item.questions, iq);">
                                    <md-icon>arrow_downward</md-icon>
                                </span>
                                <span class="pointer error-color" 
                                    title="Delete this question"
                                    @click="deleteQuestion(item.questions, iq)">
                                    <md-icon>close</md-icon>        
                                </span>
                            </div>
                            <div class="flex_h-center counter-1">
                                <md-field>
                                    <md-input autocorrect="off" 
                                        autocapitalize="off" 
                                        type="text" 
                                        aria-label="Question..." 
                                        placeholder="Question..." 
                                        autocomplete="off"
                                        v-model.trim="question.name"
                                        class="flex-1 bold border-no font15" />
                                </md-field>
                            </div>
                            <div>
                                <md-field style="width:100px;">
                                    <label>Duration</label>
                                    <md-select v-model="question.duration">
                                        <md-option value="10">10 sec.</md-option>
                                        <md-option value="15">15 sec.</md-option>
                                        <md-option value="20">20 sec.</md-option>
                                        <md-option value="25">25 sec.</md-option>
                                        <md-option value="25">30 sec.</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                            <div v-show="question.collapse === false">
                                <ul class="padding_05_1 list-1">
                                    <li v-for="(response, idx) in question.response" 
                                        :key="idx"
                                        class="flex_h-center flex_v-center padding_0_1 response-item"
                                        v-bind:class="{ success: response.correct_answer === true }">
                                        <span class="pointer error-color" 
                                            title="Delete this response"
                                            @click="deleteResponse(question.response, idx)">
                                            <md-icon>close</md-icon>    
                                        </span>
                                        <span class="pointer" 
                                            title="Check this response as the correct answer"
                                            @click="checkAsCorrectResponse(response, question.response, idx);">
                                            <md-icon>check</md-icon>      
                                        </span>
                                        <md-field>
                                            <md-input autocorrect="off" 
                                                autocapitalize="off" 
                                                type="text" 
                                                aria-label="Response..." 
                                                placeholder="Response..." 
                                                autocomplete="off"
                                                v-model.trim="response.name" />
                                        </md-field>
                                    </li>
                                    <li class="flex_h-center flex_v-center padding_0_1">
                                        <md-field>
                                            <md-input autocorrect="off" 
                                                autocapitalize="off" 
                                                type="text" 
                                                aria-label="Add new response..." 
                                                placeholder="Add new response..." 
                                                autocomplete="off"
                                                v-model.trim="question.questionToadd"
                                                @keydown="addQuestion($event, question)" />
                                        </md-field>
                                        <md-button
                                            role="button"
                                            tabindex="0"
                                            class="pointer md-primary"
                                            title="Add response"
                                            @click="addQuestion(null, question)">
                                            <md-icon>add</md-icon>
                                        </md-button>
                                    </li>
                                </ul>
                            </div>
                        </md-card-content>
                    </md-card>
                    
                    <md-card class="margin_05_1 relative">
                        <md-card-content>
                            <div class="padding_05_1 flex_h-center">
                                <md-field>
                                    <md-input autocorrect="off"
                                        autocapitalize="off" 
                                        name="quiz" 
                                        type="text" 
                                        aria-label="Add new question" 
                                        placeholder="Add new question" 
                                        autocomplete="off"
                                        v-model.trim="newQuestionName"
                                        class="flex-1"
                                        @keydown="add($event)"
                                        autofocus />
                                </md-field>
                                <md-button
                                    role="button"
                                    tabindex="0"
                                    class="pointer md-primary"
                                    title="Add new question"
                                    @click="add()">
                                    <md-icon>add_circle_outline</md-icon>
                                </md-button>
                            </div>
                        </md-card-content>
                    </md-card>
    
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
        SocketService.room(this.event);
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
        add(evt) {
            if(evt && evt.keyCode !== 13) return;
            this.item.questions.push({
                name: this.newQuestionName,
                duration: 15,
                collapse: false,
                response: []
            });
            this.newQuestionName = '';
        },
        moveQuestion(direction, questions, idx) {
            const newIndex = (direction === 'up')? idx - 1 : idx + 1;
            if (newIndex < 0) return false;
            if (newIndex >= questions.length) return false;
            questions[idx] = questions.splice(newIndex, 1, questions[idx])[0];
        },
        checkAsCorrectResponse(response, responses, idx) {
            responses = responses.map(item => {
                item.correct_answer = false;
                return item;
            });
            response.correct_answer = true;
            this.$forceUpdate();
        },
        deleteQuestion(questions, idx) {
            questions = questions.splice(idx, 1);
        },
        deleteResponse(response, idx) {
            response = response.splice(idx, 1);
        },
        addQuestion(evt, question) {
            if(evt && evt.keyCode !== 13) return;
            if(question.questionToadd) {
                question.response.push({
                    uid: Math.random().toString(36).substr(2),
                    name: question.questionToadd.trim()
                });
                question.questionToadd = '';
            }
        },
        showQuestion(question) {
            question.collapse = false;
            this.$forceUpdate();
        },
        hideQuestion(question) {
            question.collapse = true;
            this.$forceUpdate();
        },
        saveQuestion(evt) {
            if(evt && evt.keyCode !== 13) return;
            const data = Object.assign({}, this.item);
            delete data['_id'];
            delete data['inserted_at'];
            delete data['owner'];
            delete data['event'];
            (new Http()).send('/quiz/' + this.quiz, 'POST', data).then((response) => {
                // raf
            }).catch(function(err) {

            });
        }
    }
});
