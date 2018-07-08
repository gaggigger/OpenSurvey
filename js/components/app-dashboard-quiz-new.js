Vue.component('app-dashboard-quiz-new', {
    template: `
        <section class="padding_05_1 flex_h-center">
            <div class="bold font15 padding_0_1 v-align-center">#</div>
            <input autocorrect="off" 
                    autocapitalize="off" 
                    name="quiz" 
                    type="text" 
                    aria-label="Enter quiz name" 
                    placeholder="Enter quiz name" 
                    autocomplete="off"
                    v-model="quizname"
                    autofocus />
            <a href="#" 
                class="primary join-button v-align-center h-align-center padding_0_1"
                @click="add">
                Create Quiz
            </a>
        </section>
    `,
    props: {
        event: {
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            quizname: ''
        };
    },
    methods: {
        add: function() {
            if (!this.quizname) return false;
            const http = new Http();
            http.send('/quiz', 'POST', {
                event: this.event,
                name: this.quizname
            }).then((response) => {

            }).catch(function(err) {

            });
        }
    }
});
