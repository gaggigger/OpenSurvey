Vue.component('app-dashboard-event-list', {
    template: `
        <div>
            <ul class="list-1 flex flex_h-center flex_v-center">
                <li v-for="item in filterItem(items)" 
                    @click="goto(item._id)"
                    class="border-width_1 border-radius_5px background-hover pointer margin_1 padding_1">
                    #{{ item.name }}
                </li>
            </ul>
        </div>
    `,
    props: ['reload', 'filter'],
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
        goto(id) {
            this.$router.push({
                name: 'event',
                params:{ event: id }
            });
        },
        get() {
            EventService.getAll().then((response) => {
                this.items = response;
            }).catch(function(err) {
                // raf
            });
        },
        filterItem(items) {
            return items.filter(item => {
                if(this.filter === '') return true;
                return item.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
            });
        },
    }
});
