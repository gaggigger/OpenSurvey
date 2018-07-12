const routesList = [];

if(typeof R_IDENTIFICATION !== 'undefined') routesList.push({
    path: '/identification', name:'identification', component: R_IDENTIFICATION, meta: {
        breadcrumb: []
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
        if(!Auth.getters.isLogged) {
            this.$router.push({ path: 'identification' });
        }
    },
    mounted : function() {
        this.$nextTick(function () {
            this.isLoading = false;
        });
    }
});

// Vue.use(Vuex);