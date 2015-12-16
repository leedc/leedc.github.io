var Hasher = {
    routes: [],
    regex: {
        HASH_STRIP: /^#!*/,
        ARG_NAMED: /:([\w\d]+)/g,
        ARG_SPLAT: /\*([\w\d]+)/g,
        ESC: /[-[\]{}()+?.,\\^$|#\s]/g},
        history: {cache: !1,support: "history" in window
    },
    marray: function(b) {
        return Array.prototype.slice.call(b, 0)
    },proxy: function(d) {
        var c = this;
        return function() {
            return d.apply(c, arguments)
        }
    },proxyAll: function() {
        for (var d = this.marray(arguments), c = 0; c < d.length; c++) {
            this[d[c]] = this.proxy(this[d[c]])
        }
    },add: function(e, d) {
        if (typeof e == "object") {
            for (var f in e) {
                this.add(f, e[f])
            }
        } else {
            typeof e == "string" && (e = e.replace(this.regex.ESC, "\\$&").replace(this.regex.ARG_NAMED, "([^/]*)").replace(this.regex.ARG_SPLAT, "(.*?)"), e = RegExp("^" + e + "$")), this.routes.push({route: e,callback: d})
        }
    },setup: function(b) {
        if (b && b.history) {
            this.history.cache = this.history.support && b.history
        }
        this.history.cache ? $(window).bind("popstate", this.change) : $(window).bind("hashchange", this.change);
        this.proxyAll("change");
        this.change()
    },unbind: function() {
        this.history ? $(window).unbind("popstate", this.change) : $(window).unbind("hashchange", this.change)
    },navigate: function() {
        var d = this.marray(arguments), c = !1;
        typeof d[d.length - 1] == "boolean" && (c = d.pop());
        d = d.join("/");
        if (this.path != d) {
            if (!c) {
                this.path = d
            }
            this.history.cache ? history.cache.pushState({}, document.title, this.getHost() + d) : window.location.hash = d
        }
    },match: function(e, d, f) {
        e = d.exec(e);
        if (!e) {
            return !1
        }
        e = e.slice(1);
        f.apply(f, e);
        return !0
    },getPath: function() {
        return window.location.pathname
    },getHash: function() {
        return window.location.hash
    },getHost: function() {
        return (document.location + "").replace(this.getPath() + this.getHash(), "")
    },getFragment: function() {
        return this.getHash().replace(this.regex.HASH_STRIP, "")
    },change: function() {
        var e = Hasher.history.cache ? Hasher.getPath() : Hasher.getFragment();
        if (e != Hasher.path) {
            Hasher.path = e;
            for (var d = 0; d < Hasher.routes.length; d++) {
                var f = Hasher.routes[d];
                if (Hasher.match(e, f.route, f.callback)) {
                    break
                }
            }
        }
    }};
