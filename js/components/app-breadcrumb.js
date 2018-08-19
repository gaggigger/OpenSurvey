Vue.component('app-breadcrumb', {
    template: `
        <nav>
            <md-chip class="md-active" md-clickable>
                <a href="./">Home</a>
            </md-chip>
            <md-chip  v-for="(menu, idx) in items"
                :key="idx" 
                :class="{'md-active': menu.link, 'md-disabled': !menu.link}"
                :md-clickable="!!menu.link">
                <router-link :to="goto(menu.link)" v-if="menu.link">{{ getName(menu.name) }}</router-link>
                <span v-if="!menu.link">{{ getName(menu.name) }}</span>
            </md-chip>
       </nav>
    `,
    watch: {
        '$route' () {
            this.updateItems();
        }
    },
    mounted() {
        this.updateItems();
    },
    data() {
        return {
            items: [],
            params: {}
        };
    },
    methods: {
        getName(name) {
            return BreadCrumbsStore.getters.text(name);
        },
        updateItems() {
            this.params = Object.assign({}, this.$route.params);
            if(this.$route.meta && this.$route.meta.breadcrumb) {
                this.items = this.$route.meta.breadcrumb.slice(0);
            }
        },
        goto(link) {
            for (param in this.params) {
                link = link.replace(`:${param}`, this.params[param]);
            }
            return link;
        }
    }
});

const BreadCrumbsStore = new Vuex.Store({
    state: {
        items: {
            ':Event': 'Event',
            ':Quiz': 'Quiz'
        }
    },
    getters: {
        text: (state) => (key) => {
            if(state.items[key]) return state.items[key];
            return key;
        }
    },
    mutations: {
        text(state, data) {
            Object.assign(state.items, data);
        }
    }
});