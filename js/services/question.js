const QuestionService = {
    ask(eventUid, question, anonymously) {
        return new Promise((resolv, reject) => {
            (new Http()).send('/qa', 'POST', {
                event: eventUid,
                question: question,
                anonymously: anonymously
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
    },
    answered(question) {
        return new Promise((resolv, reject) => {
            (new Http()).send('/qa/' + question._id + '/answered', 'POST').then(response => {
                resolv(response);
            }).catch(err => {
                reject(err);
            });
        });
    },
    updateList(questions, question) {
        let qFound = false;
        const res = questions.map(q => {
            if(q._id === question._id) {
                qFound = true;
                q = question;
            }
            return q;
        });
        if(! qFound) {
            res.push(question);
        }
        return res;
    }
};