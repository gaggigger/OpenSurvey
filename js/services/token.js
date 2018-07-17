const TokenService = {
    getPayload(token) {
        if(!token) return false;
        const payload = token.split('.')[1];
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
