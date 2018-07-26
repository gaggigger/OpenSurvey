const SocketService = {
    events: {},
    rooms: [],
    on(eventName, cb, eventId) {
        if(!this.events[eventId]) {
            socket.on(eventName, cb);
            this.events[eventId] = true;
        }
    },
    room(event) {
        if(this.rooms.indexOf(event) === -1) {
            socket.emit('event-room', event);
            this.rooms.push(event);
        }
    }
};