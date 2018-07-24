const SocketService = {
    events: {},
    on(eventName, cb, eventId) {
        if(!this.events[eventId]) {
            socket.on(eventName, cb);
            this.events[eventId] = true;
        }
    },
    quizWatcher(vue) {
        // Redirect to right page
        SocketService.on('event-quiz-run', (quiz) => {
            if(vue.$router.currentRoute.name !== 'client-quiz') {
                // TODO countdown message
                window.setTimeout(() => {
                    vue.$router.push({ name: 'client-quiz', params: {
                            event: quiz.event,
                            quiz: quiz._id
                        }});
                }, 3000);
            }
        }, 'service-socket-quiz-run');
    }
};