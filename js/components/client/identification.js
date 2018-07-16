var R_IDENTIFICATION = Vue.component('client-identitication', {
    template:
        '<section class="surface padding_top_3">' +
        '   <h2 class="h-align-center">' +
        '       Please enter your name or nickname to access the event' +
        '   </h2>' +
        '   <div class="flex_h-center padding_1">' +
        '       <input autocorrect="off"' +
        '               autocapitalize="off"' +
        '               name="username"' +
        '               type="text"' +
        '               v-model="username"' +
        '               aria-label="Enter your nickname"' +
        '               placeholder="Enter your nickname"' +
        '               autocomplete="off"' +
        '               autofocus />' +
        '       <div role="button"' +
        '               tabindex="0"' +
        '               @click="join"' +
        '               class="padding_0_1 pointer primary v-align-center h-align-center">' +
        '               Join' +
        '       </div>' +
        '   </div>' +
        '</section>',
    data: function() {
        return {
            username: ''
        };
    },
    created: function() {
        if(Auth.getters.isLogged) {
            this.$router.push({ name: 'home' })
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
