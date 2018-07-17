const TokenService = {
    getPayload: function(token) {
        if(!token) return false;
        var payload = token.split('.')[1];
        if(payload) {
            try {
                return JSON.parse(atob(payload));
            } catch(e) {
                return false;
            }
        }
        return false;
    }
};
