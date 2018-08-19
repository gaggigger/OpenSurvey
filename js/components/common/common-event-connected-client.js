Vue.component('common-event-connected-client', {
    template: `
        <md-chip>
            Connected {{ numberOfConnectedClient }}
        </md-chip>
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
