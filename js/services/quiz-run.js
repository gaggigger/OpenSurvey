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
    },
    respond(eventUid, quizrunUid, question) {
        console.log(eventUid, quizrunUid, question);
        return new Promise((resolv, reject) => {
            (new Http()).send(`/quizresponse/${eventUid}/${quizrunUid}/respond`, 'POST', {
                current_question: question.current_question,
                response: question.uid
            }).then(response => {
                console.log(response);
                resolv(response);
            }).catch(function(err) {
                // TODO log
                console.error(err);
            });
        });
    }
};
