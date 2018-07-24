Vue.component('common-http-loading', {
    template: `
        <transition name="slide-fade">
            <div class="position-fixed-bottom-right main-loading" v-show="numCurrentRequest > 0">
                <span>
                    Loading...
                </span>
            </div>
        </transition>
    `,
    data() {
        return {};
    },
    computed: {
        numCurrentRequest() {
            return Auth.getters.numCurrentRequest;
        }
    }
});
