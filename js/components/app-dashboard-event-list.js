Vue.component('app-dashboard-event-list', {
    template: `
        <div>
            <ul class="list-1">
                <li v-for="item in items" 
                    class="surface margin_1_0 padding_05_1">
                    <router-link :to="{ path: '/event/' + item._id }">
                        <a>{{ item.name }}</a>
                    </router-link>
                </li>
            </ul>
        </div>
    `,
    props: ['reload'],
    data: function() {
        return {
            items: []
        };
    },
    created: function() {
        this.get();
    },
    watch: {
        reload: function() {
            this.get();
        }
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
