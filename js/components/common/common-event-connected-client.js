Vue.component('common-event-connected-client', {
    template: `
        <div class="padding_1">
            <span>
                Connected {{ numberOfConnectedClient }}
            </span>
        </div>
    `,
    data() {
        return {};
    },
    computed: {
        numberOfConnectedClient() {
            return Auth.getters.numberOfConnectedUsers;
        }
    }
});
