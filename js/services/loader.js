var loadScript = function (safe, src, id) {
    if (window.location.hostname !== 'localhost' && ! /\.min\.js$/.test(src)) {
        src = src.replace(/^js/, 'dist/');
    }
    if (document.getElementById(id)) return;
    if(safe) {
        let js, fjs = document.getElementsByTagName('script')[0];
        js = document.createElement('script');
        js.id = id;
        js.src = src;
        js.type = 'text/javascript';
        js.async = true;
        js.defer = true;
        fjs.parentNode.insertBefore(js, fjs);
    } else {
        const js = document.createElement('script');
        js.src = src;
        js.type = 'text/javascript';
        js.id = id;
        document.write(js.outerHTML);
    }
};
var loadLink = function (src, id) {
    let lnk, flnk = document.getElementsByTagName('link')[0];
    if (document.getElementById(id)) return;
    lnk = document.createElement('link');
    lnk.id = id;
    lnk.href = src;
    lnk.rel = 'stylesheet';
    lnk.type = 'text/css';
    flnk.parentNode.insertBefore(lnk, flnk);
};