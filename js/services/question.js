const QuestionService = {
    ask(eventUid, question) {
        return new Promise((resolv, reject) => {
            (new Http()).send('/qa', 'POST', {
                event: eventUid,
                question: question
            }).then(response => {
                resolv(response);
            }).catch(err => {
                reject(err);
            });
        });
    },
    getAll(eventId) {
        return new Promise((resolv, reject) => {
            (new Http()).send('/qa', 'GET', { event: eventId }).then(response => {
                resolv(response);
            }).catch(err => {
                reject(err);
            });
        });
    },
    like(question) {
        return new Promise((resolv, reject) => {
            (new Http()).send('/qa/' + question._id + '/like', 'POST').then(response => {
                resolv(response);
            }).catch(err => {
                reject(err);
            });
        });
    }
};