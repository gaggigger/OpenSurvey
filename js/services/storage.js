const Storage = (function () {
    const get = function(key) {
        const v = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    };
    const set = function(key, value, day) {
        if (day === undefined) day = 86400000; // 1 day
        const d = new Date;
        d.setTime(d.getTime() + 24*60*60*1000*day);
        document.cookie = key + "=" + value + ";path=/;expires=" + d.toGMTString();
    };
    const remove = function(key) {
        set(key, '', -1);
    };
    return {
        get: get,
        set: set,
        remove: remove
    }
}());