const QuizService = {
    get(quizUid) {
        return new Promise((resolv, reject) => {
            (new Http()).send('/quiz/' + quizUid, 'GET').then(response => {
                // Update breadcrumbs
                BreadCrumbsStore.commit('text', {
                    ':Quiz': response.name
                });
                resolv(response);
            }).catch(function(err) {
                // TODO log
                console.error(err);
            });
        });
    },
    getAllForEvent(event) {
        return new Promise((resolv, reject) => {
            (new Http()).send('/quiz', 'GET', {
                event: event
            }).then(response => {
                resolv(response);
            }).catch(function (err) {
                // TODO log
                console.error(err);
            });
        });
    }
};