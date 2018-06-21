const router = new VueRouter({
    routes: [
        { path: '/', component: R_HOME },
        { path: '/login', component: R_LOGIN }
    ]
});

new Vue({
    el: '#app',
    router: router,
    data: function() {
        return {
            isLoading : true
        };
    },
    computed: {
        isLogged () {
            return true;
            // return Auth.getters.isLogged
        }
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