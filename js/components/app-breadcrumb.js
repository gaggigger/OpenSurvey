Vue.component('app-breadcrumb', {
    template: `
        <nav>
            <ul class="list-1 flex">
                <li>
                    <router-link to="/">OpenSurvey</router-link>
                    <span v-if="items.length > 0">
                        &nbsp;&gt;&nbsp;
                    </span>
                </li>
                <li v-for="(menu, idx) in items"
                    :key="idx">
                    <router-link :to="goto(menu.link)"
                        v-if="menu.link"
                    >{{ menu.name }}</router-link>
                    <span v-if="!menu.link">
                        {{ menu.name }}
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
    mounted () {
        this.updateItems();
    },
    data: function () {
        return {
            items: [],
            params: {}
        };
    },
    methods: {
        updateItems () {
            this.params = {...this.$route.params};
            this.items = [...this.$route.meta.breadcrumb];
        },
        goto (link) {
            for (param in this.params) {
                link = link.replace(`:${param}`, this.params[param]);
            }
            return link;
        }
    }
});
