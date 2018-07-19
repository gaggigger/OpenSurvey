var routesList = [];

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
if(typeof R_CLIENT_QA !== 'undefined') routesList.push({
    path: '/:event/qa', name:'client-qa', component: R_CLIENT_QA, props: true, meta: {
        breadcrumb: [
            { name: 'Event', link: '/:event' },
            { name: 'Q&A' }
        ]
    }
});

var router = new VueRouter({ routes: routesList });

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