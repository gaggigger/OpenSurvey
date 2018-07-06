const Http = function () {
    const baseUrl = Config.api.url;
    const headers = {
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Accept-Charset': 'utf-8'
        },
        mode: 'cors',
        cache: 'default'
    };
    const _formatGetParameters = function (parameters) {
        return '?' + Object.keys(parameters).reduce((acc, k) => {
            acc.push(`${k}=${encodeURIComponent(parameters[k])}`);
            return acc
        }, []).join('&');
    };
    const _send = function(url, method = 'GET', parameters = {}) {
        if (!/^http/.test(url)) url = baseUrl + url;

        const h = Object.assign({
            method: method
        }, headers);
        // Add token header
        if (typeof Auth !== 'undefined' && Auth.getters.isLogged) {
            h.headers.Authorization = Auth.state.authToken;
        }
        if (method === 'GET') {
            url += _formatGetParameters(parameters);
        } else {
            h.body = JSON.stringify(parameters);
            h.headers['Content-Type'] = 'application/json; charset=utf-8';
        }
        return fetch(url, h)
            .then(response => response.json())
            .then(response => {
                if (response && response.error) throw response.error;
                if (response && response.token && typeof Auth !== 'undefined') Auth.commit('authToken', response.token);
                return response
            })
            .catch(err => {
                console.error(err);
                throw err;
            });
    };

    return {
        send: _send
    }
};
