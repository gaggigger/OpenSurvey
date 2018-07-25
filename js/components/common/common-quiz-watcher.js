Vue.component('common-quiz-watcher', {
    template: `
        <div v-if="visible" class="position-full z10 flex_v-center flex_h-center">
            <div class="primary-inversed padding_1">
                Quiz will begin in a few moments
            </div>
        </div>
    `,
    computed: {

    },
    data() {
        return {
            visible: false
        };
    },
    created() {
        if(typeof SocketService === 'undefined') return true;
        //Watch quiz start
        SocketService.on('event-quiz-run', (quizrun) => {
            if(this.$router.currentRoute.name !== 'client-quiz') {
                this.visible = true;
                // TODO countdown message
                window.setTimeout(() => {
                    this.visible = false;
                    this.$router.push({
                        name: 'client-quiz',
                        params: {
                            event: quizrun.event,
                            quizrun: quizrun._id.toString()
                        }
                    });
                }, 3000);
            }
        }, 'common-quiz-watcher');
        // Watch for question start
        SocketService.on('event-quiz-question', (data) => {
            if(this.$router.currentRoute.name !== 'client-quiz') {
                this.$router.push({
                    name: 'client-quiz',
                    params: {
                        event: data.event,
                        quizrun: data.quizrun
                    }
                });
            }
        });
    },
    methods: {

    }
});
