Vue.component('common-event-connected-client', {
    template: `
        <md-chip title="Connected people" v-if="numberOfConnectedClient">
            <md-icon>people</md-icon> {{ numberOfConnectedClient }}
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
