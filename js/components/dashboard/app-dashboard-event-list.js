Vue.component('app-dashboard-event-list', {
    template: `
        <div class="h-align-center">
            <md-card v-for="item in filterItem"
                :key="item._id"
                class="margin_1 display-inline-block">
                <md-card-content>
                    <div  
                    @click="goto(item._id)"
                    class="pointer">
                        #{{ item.name }}
                    </div>
                </md-card-content>
            </md-card>
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
    computed: {
        filterItem() {
            return this.items.filter(item => {
                if(this.filter === '') return true;
                return item.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
            });
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
        }
    }
});
