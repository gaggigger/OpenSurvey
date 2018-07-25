const R_CLIENT_ASK_QUESTION = Vue.component('client-ask-question', {
    template: `
        <section class="padding_1 padding_top_3">
            <span
                role="button"
                tabindex="0"
                @click="cancel"
                class="pointer padding_1 display-inline-block a-like background-hover">
                <b>&lt;</b> Back
            </span>
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
                @click="send(false)"
                class="pointer primary margin_1 join-button padding_1">
                Send
            </span>
            <span
                role="button"
                tabindex="0"
                @click="send(true)"
                class="pointer primary margin_1 join-button padding_1">
                Send anonymously
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
    created() {

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
