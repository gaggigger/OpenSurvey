const TokenService = {
    getPayload: function(token) {
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
