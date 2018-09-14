const R_DASHBOARD_QA = Vue.component('app-dashboard-qa', {
    template: `
        <div class="page">
            <section>
                <div class="relative">
                    <div v-for="(question, iq) in questions" :key="iq">
                        <md-card class="margin-bottom_05" v-if="iq < 3">
                            <md-card-header>
                                <div class="md-title">
                                    <span class="font18">{{ question.question }}</span>
                                </div>
                            </md-card-header>
                            <md-divider></md-divider>
                            <md-card-actions>
                                <div class="md-subhead">
                                    <md-chip class="md-primary" md-clickable>
                                        <span @click="answered(question)" class="pointer font15" title="Mark as answered">
                                            <md-icon>spellcheck</md-icon>
                                        </span>
                                    </md-chip>
                                    <md-chip class="md-primary">{{ numlike(question) }}</md-chip>
                                    <md-chip class="md-primary">{{ question.owner }}</md-chip> 
                                    <md-chip>{{ questiondate(question.inserted_at) }}</md-chip>
                                </div>
                            </md-card-actions>
                        </md-card>
                        <md-list v-if="iq >= 3">
                            <md-list-item>
                                <span @click="answered(question)" class="pointer" title="Mark as answered">
                                    <md-icon>spellcheck</md-icon>
                                </span>
                                <span class="md-list-item-text md-list-item-text">&nbsp; {{ question.question }}</span>
                            </md-list-item>
                            <md-divider></md-divider>
                        </md-list>                        
                    </div>
                </div>
           </section>
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
        SocketService.on('event-question-modified', this.updateQuestion, 'app-dashboard-event-question-modified');
    },
    data() {
        return {
            questions: []
        };
    },
    methods: {
        getEvent() {
            EventService.get(this.event).then(response => {
                // raf?
            });
        },
        order(data) {
            data.sort((a,b) => {
                if(!a.likes && !b.likes) return 0;
                if(!a.likes) return 1;
                if(!b.likes) return -1;
                if(b.likes.length === a.likes.length) {
                    return (new Date(a.inserted_at)).getTime() - (new Date(b.inserted_at)).getTime();
                }
                return b.likes.length - a.likes.length;
            });
            return data.filter(item => !item.answered);
        },
        get() {
            QuestionService.getAll(this.event).then(response => {
                this.questions = this.order(response);
            });
        },
        numlike(question) {
            if(question.likes) {
                return question.likes.length;
            }
            return 0;
        },
        questiondate(dt) {
            return (new Date(dt)).toLocaleString();
        },
        answered(question) {
            QuestionService.answered(question).then(response => {
                this.questions.map(question => {
                    if(question._id === response._id && response.answered) {
                        question.answered = true;
                    }
                });
                this.questions = this.questions.filter(item => !item.answered);
                this.$forceUpdate();
            });
        },
        updateQuestion(data) {
            this.questions = this.order(QuestionService.updateList(this.questions, data));
            this.$forceUpdate();
        }
    }
});
