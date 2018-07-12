Vue.component('app-breadcrumb', {
    template: `
        <nav>
            <ul class="list-1 flex">
                <li>
                    <router-link to="/">Home</router-link>
                    <span v-if="items.length > 0">
                        &nbsp;&gt;&nbsp;
                    </span>
                </li>
                <li v-for="(menu, idx) in items"
                    :key="idx">
                    <router-link :to="goto(menu.link)"
                        v-if="menu.link"
                    >{{ getName(menu.name) }}</router-link>
                    <span v-if="!menu.link">
                        {{ getName(menu.name) }}
                    </span>
                    <span v-if="idx < items.length-1">
                        &nbsp;&gt;&nbsp;
                    </span>
                </li>
            </ul>
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