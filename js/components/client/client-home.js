var R_CLIENT_HOME = Vue.component('client-home', {
    template:
    '<section class="surface padding_top_3">' +
    '   <h2 class="h-align-center">' +
    '       HELLO' +
    '   </h2>' +
    '   <div class="flex_h-center padding_1">' +
    '       hhhhhh' +
    '   </div>' +
    '</section>',
    data: function() {
        return {
            username: ''
        };
    },
    created: function() {
        if(Auth.getters.isGuest) {

        }
    },
    methods: {
        join: function() {
            var event = window.location.search.split('&').shift().replace('?code=', '');
            window.location.href = window.location.origin
                + window.location.pathname.replace(/event\.html$/, '')
                + 'login.html?'
                + 'code=' + encodeURIComponent(this.username)
                + '&event=' + encodeURIComponent(event)
                + '&provider=guest'
            ;
        }
    }
});
