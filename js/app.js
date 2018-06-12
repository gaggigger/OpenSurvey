new Vue({
    el: '#app',
    data: function() {
        return {
            isLoading : true
        };
    },
    mounted : function() {
        this.$nextTick(function () {
            this.isLoading = false;
        });
    },
    methods : {

    }
});