const routesList = [];

if(typeof R_IDENTIFICATION !== 'undefined') routesList.push({
    path: '/identification/:event?', name:'identification', props: true, component: R_IDENTIFICATION, meta: {
        breadcrumb: []
    }
});
if(typeof R_CLIENT_HOME !== 'undefined') routesList.push({
    path: '/:event', name:'home', component: R_CLIENT_HOME, props: true, meta: {
        breadcrumb: []
    }
});
if(typeof R_CLIENT_ASK_QUESTION !== 'undefined') routesList.push({
    path: '/:event/qa', name:'client-ask-question', component: R_CLIENT_ASK_QUESTION, props: true, meta: {
        breadcrumb: [
            { name: 'Event', link: '/:event' },
            { name: 'Q&A' }
        ]
    }
});
if(typeof R_CLIENT_QUIZ !== 'undefined') routesList.push({
    path: '/:event/quizrun/:quizrun', name:'client-quiz', component: R_CLIENT_QUIZ, props: true, meta: {
        breadcrumb: [
            { name: 'Event', link: '/:event' },
            { name: 'Quiz' }
        ]
    }
});
const router = new VueRouter({ routes: routesList });

new Vue({
    el: '#app',
    router: router,
    data() {
        return {
            isLoading : true
        };
    },
    created() {
        SocketService.quizWatcher(this);
    },
    mounted() {
        this.$nextTick(function () {
            this.isLoading = false;
        });
    },
    methods: {
    }
});