var routesList = [];

if(typeof R_IDENTIFICATION !== 'undefined') routesList.push({
    path: '/identification', name:'identification', component: R_IDENTIFICATION, meta: {
        breadcrumb: []
    }
});
if(typeof R_CLIENT_HOME !== 'undefined') routesList.push({
    path: '/', name:'home', component: R_CLIENT_HOME, meta: {
        breadcrumb: []
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
        if(!Auth.getters.isLogged) {
            this.$router.push({ name: 'identification' });
        } else {
            this.$router.push({ name: 'home' });
        }
    },
    mounted : function() {
        this.$nextTick(function () {
            this.isLoading = false;
        });
    }
});