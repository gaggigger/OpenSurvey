const R_CLIENT_QA = Vue.component('client-qa', {
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
                @click="send"
                class="pointer primary join-button padding_1">
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
        send() {
            console.log(this.question);
        }
    }
});
