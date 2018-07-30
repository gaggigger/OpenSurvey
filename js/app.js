const routesList = [];
if(typeof R_HOME !== 'undefined') routesList.push({
    path: '/', name:'home', component: R_HOME, meta: {
        breadcrumb: []
    }
});
if(typeof R_LOGIN !== 'undefined') routesList.push({
    path: '/login', name: 'login', component: R_LOGIN, meta: {
        breadcrumb: [
            { name: 'Login' }
        ]
    }
});
if(typeof R_DASHBOARD !== 'undefined') routesList.push({
    path: '/dashboard', name: 'dashboard', component: R_DASHBOARD, meta: {
        breadcrumb: [
            {name: 'Dashboard'}
        ]
    }
});
if(typeof R_DASHBOARD_EVENT !== 'undefined') routesList.push({
    path: '/event/:event', name: 'event', component: R_DASHBOARD_EVENT, props: true, meta: {
        breadcrumb: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: ':Event' }
        ]
    }
});
if(typeof R_DASHBOARD_QUIZ_LIST !== 'undefined') routesList.push({
    path: '/event/:event/quiz', name: 'eventquiz', component: R_DASHBOARD_QUIZ_LIST, props: true, meta: {
        breadcrumb: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: ':Event', link: '/event/:event' },
            { name: 'Quizs' }
        ]
    }
});
if(typeof R_DASHBOARD_QUIZ !== 'undefined') routesList.push({
    path: '/event/:event/quiz/:quiz', name: 'eventquizitem', component: R_DASHBOARD_QUIZ, props: true, meta: {
        breadcrumb: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: ':Event', link: '/event/:event' },
            { name: 'Quizs', link: '/event/:event/quiz' },
            { name: ':Quiz' }
        ]
    }
});
if(typeof R_DASHBOARD_QUIZ_EDIT !== 'undefined') routesList.push({
    path: '/event/:event/quiz/:quiz/edit', name: 'eventquizitemedit', component: R_DASHBOARD_QUIZ_EDIT, props: true, meta: {
        breadcrumb: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: ':Event', link: '/event/:event' },
            { name: 'Quizs', link: '/event/:event/quiz' },
            { name: ':Quiz', link: '/event/:event/quiz/:quiz' },
            { name: 'Edit' }
        ]
    }
});
if(typeof R_DASHBOARD_QA !== 'undefined') routesList.push({
    path: '/event/:event/qa', name: 'eventqa', component: R_DASHBOARD_QA, props: true, meta: {
        breadcrumb: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: ':Event', link: '/event/:event' },
            { name: 'Q&A' }
        ]
    }
});

const router = new VueRouter({ routes: routesList });

new Vue({
    el: '#app',
    router: router,
    data: function() {
        return {
            isLoading : true
        };
    },
    created : function() {

    },
    mounted : function() {
        this.$nextTick(function () {
            this.isLoading = false;
        });
    }
});

// Vue.use(Vuex);