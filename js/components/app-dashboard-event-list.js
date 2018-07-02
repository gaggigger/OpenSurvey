Vue.component('app-dashboard-event-list', {
    template: `
        <div>
            <ul>
                <li v-for="item in items">
                    <router-link :to="{ path: '/event/' + item._id }">
                        <a>{{ item.name }}</a>
                    </router-link>
                </li>
            </ul>
        </div>
    `,
    data: function() {
        return {
            items: []
        };
    },
    created: function() {
        this.get();
    },
    methods: {
        get: function() {
            const http = new Http();
            http.send('/event', 'GET').then((response) => {
                this.items = response;
            }).catch(function(err) {

            });
        }
    }
});
