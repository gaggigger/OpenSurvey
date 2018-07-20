const R_CLIENT_ASK_QUESTION = Vue.component('client-ask-question', {
    template: `
        <section class="padding_1 padding_top_3">
            <div class="margin_1_0">
                <textarea 
                    autocomplete="off"
                    autocapitalize="sentences"
                    autofocus
                    placeholder="Your question..."
                    required="required"
                    spellcheck="true"
                    rows="5"
                    v-model="question"
                    class="sw100"></textarea>
            </div>
            <span
                role="button"
                tabindex="0"
                @click="cancel"
                class="pointer primary join-button padding_1 margin_0_05">
                Cancel
            </span>
            <span
                role="button"
                tabindex="0"
                @click="send"
                class="pointer primary join-button padding_1 margin_0_05">
                Send
            </span>
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
    methods: {
        cancel() {
            this.$router.push({
                name: 'home', params: { event: this.event }
            });
        },
        send() {
            if(this.question === '') {
                return false;
            }
            QuestionService.ask(this.event, this.question)
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
