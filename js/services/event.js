const EventService = {
    get(eventUid) {
        return new Promise((resolv, reject) => {
            (new Http()).send('/event/' + eventUid, 'GET').then(response => {
                // Update breadcrumbs
                BreadCrumbsStore.commit('text', {
                    ':Event': '#' + response.name
                });
                resolv(response);
            }).catch(function(err) {
                // TODO log
                console.error(err);
            });
        });
    },
    getAll() {
        return new Promise((resolv, reject) => {
            (new Http()).send('/event', 'GET').then(response => {
                resolv(response);
            }).catch(function (err) {
                // TODO log
                console.error(err);
            });
        });
    },
    findByName(eventname) {
        return new Promise((resolv, reject) => {
            (new Http()).send('/event/find/', 'GET', {
                eventname: eventname
            }).then(response => {
                resolv(response);
            }).catch(function (err) {
                // TODO log
                console.error(err);
            });
        });
    }
};