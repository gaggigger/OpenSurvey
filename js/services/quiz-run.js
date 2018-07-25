const QuizRunService = {
    getQuizStep(eventUid, quizrunUid) {
        return new Promise((resolv, reject) => {
            (new Http()).send(`/quizrun/${eventUid}/${quizrunUid}/step`, 'GET').then(response => {
                resolv(response);
            }).catch(function(err) {
                // TODO log
                console.error(err);
            });
        });
    }
};
