const R_CLIENT_ASK_QUESTION = Vue.component('client-ask-question', {
    template: `
        <section class="padding_1">
            <md-button class="md-primary pointer"
                tabindex="0"
                @click="cancel">
                <b>&lt;</b> Back
            </md-button>
            <md-field>
                <label>Your question...</label>
                <md-textarea
                    autocomplete="off"
                    autocapitalize="sentences"
                    autofocus
                    required="required"
                    spellcheck="true"
                    rows="5"
                    v-model="question"></md-textarea>
            </md-field>
            <md-button
                @click="send(false)"
                class="md-primary pointer md-raised">
                Send
            </md-button>
            <md-button
                @click="send(true)"
                class="md-primary pointer md-raised">
                Send anonymously
            </md-button>
        </section>
    `,
    props: {
        event: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            question: ''
        };
    },
    created() {
        SocketService.room(this.event);
    },
    methods: {
        cancel() {
            this.$router.go(-1);
        },
        send(anonymously = false) {
            if(this.question === '') {
                return false;
            }
            QuestionService.ask(this.event, this.question, anonymously)
                .then(question => {
                    if(question._id) {
                        this.$router.push({
                            name: 'home', params: {
                                event: this.event
                            }
                        });
                    } else {
                        throw new Error('Question not saved');
                    }
                })
                .catch(err => {
                    alert(err.toString());
                });
        }
    }
});
