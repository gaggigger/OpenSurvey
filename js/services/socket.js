const SocketService = {
    events: {},
    on(eventName, cb, eventId) {
        if(!this.events[eventId]) {
            socket.on(eventName, cb);
            this.events[eventId] = true;
        }
    }
};