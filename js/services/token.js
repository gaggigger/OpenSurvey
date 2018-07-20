const TokenService = {
    getPayload(token) {
        if(!token) return false;
        const payload = token.split('.')[1];
        if(payload) {
            try {
                return JSON.parse(Base64Decode(payload));
            } catch(e) {
                return JSON.parse(atob(payload));
            }
        }
        return false;
    }
};
