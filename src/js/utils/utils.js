const utils = {
    $: function (selector) {
        return document.querySelector(selector);
    },
    loop: function (callback, interval) {
        if (!interval) {
            interval = (1 / 60) * 1000;
        }
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            typeof callback === 'function' && callback();
            setTimeout(this.loop(() => {
                callback();
            }, interval), interval);
        }, interval);
    },
    extend: function (target, ...args) {
        const result = target || {};
        if (result instanceof Object) {
            args.forEach((obj) => {
                if (obj instanceof Object) {
                    Object.keys(obj).forEach((key) => {
                        switch (Object.prototype.toString.call(obj[key])) {
                            case '[object Object]':
                                obj[key] = utils.extend(result[key], obj[key]);
                                break;
                        }
                        result[key] = obj[key];
                    });
                }
            });
        }
        return result;
    },
    parseToDOM: function (str) {
        const ele = document.createElement('div');
        ele.innerHTML = str;
        return ele.children[0];
    },
    find(parent, children) {
        return parent.querySelector(children);
    },
    render(callback, context) {
        if (!(typeof callback === 'function')) {
            return false;
        }
        callback.call(context);
        this.loop(callback.bind(context));
    },
};

export default utils;
