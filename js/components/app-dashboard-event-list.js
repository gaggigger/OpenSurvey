Vue.component('app-dashboard-event-list', {
    template: `
        <div>
            <ul class="list-1 flex flex_h-center flex_v-center">
                <li v-for="item in items" 
                    class="surface margin_1 padding_05_1">
                    <router-link :to="{ name: 'event', params:{ event: item._id }}">
                        <a>#{{ item.name }}</a>
                    </router-link>
                </li>
            </ul>
        </div>
    `,
    props: ['reload'],
    data() {
        return {
            items: []
        };
    },
    created() {
        this.get();
    },
    watch: {
        reload() {
            this.get();
        }
    },
    methods: {
        get() {
            EventService.getAll().then((response) => {
                this.items = response;
            }).catch(function(err) {
                // raf
            });
        }
    }
});
