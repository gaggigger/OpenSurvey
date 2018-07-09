const QuizService = {
    get(quizUid) {
        return new Promise((resolv, reject) => {
            (new Http()).send('/quiz/' + quizUid, 'GET').then(response => {
                // Update breadcrumbs
                BreadCrumbsStore.commit('text', {
                    ':Quiz': '#' + response.name
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
            (new Http()).send('/quiz', 'GET').then(response => {
                resolv(response);
            }).catch(function (err) {
                // TODO log
                console.error(err);
            });
        });
    }
};