const Storage = (function () {
    return {
        get(key) {
            const v = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
            const val = v ? v[2] : null;
            if(val === 'null') return null;
            return val;
        },
        set(key, value, day) {
            if (day === undefined) day = 86400000; // 1 day
            const d = new Date;
            d.setTime(d.getTime() + 24*60*60*1000*day);
            document.cookie = key + "=" + value + ";path=/;expires=" + d.toGMTString();
        },
        remove(key) {
            set(key, '', -1);
        }
    }
}());