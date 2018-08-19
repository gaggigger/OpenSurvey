Vue.component('common-event-connected-client', {
    template: `
        <div class="padding_1">
            <md-chip>
                Connected {{ numberOfConnectedClient }}
            </md-chip>
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
