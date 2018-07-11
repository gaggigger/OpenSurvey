const Storage = (function () {
    return {
        get: function(key) {
            var v = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
            var val = v ? v[2] : null;
            if(val === 'null') return null;
            return val;
        },
        set: function(key, value, day) {
            if (day === undefined) day = 86400000; // 1 day
            var d = new Date;
            d.setTime(d.getTime() + 24*60*60*1000*day);
            document.cookie = key + "=" + value + ";path=/;expires=" + d.toGMTString();
        },
        remove: function(key) {
            set(key, '', -1);
        }
    }
}());