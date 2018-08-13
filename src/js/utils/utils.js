const utils = {
    $(selector) {
        return document.querySelector(selector);
    },
    loop(callback, interval) {
        if (!interval) {
            interval = 100;
        }
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setInterval(this.throttle({
            method: callback, 
            wait: 500,
            ctx: this,
            immediate: true,
            arguments: [],
        }), interval);
        // this.timer = setTimeout(() => {
        //     typeof callback === 'function' && callback();
        //     setTimeout(this.loop(callback, interval), interval);
        // }, interval);
    },
    extend(target, ...args) {
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
    parseToDOM(str) {
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
    addClass(ele, className) {
        let _class = ele.getAttribute('class');
        _class += ` ${className}`;
        ele.setAttribute('class', _class);
    },
    removeClass(ele, className) {
        let _class = ele.getAttribute('class');
        _class.replace(className, '');
    },
    throttle(cof) {
        const o = this.extend({
            method: () => {}, 
            wait: 1000,
            ctx: this,
            immediate: true,
            arguments: [],
        }, cof);
        let timer;
        return () => {
            if (o.immediate) {
                o.method.apply(o.ctx, o.arguments);
                o.immediate = false;
            }
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    o.method.apply(o.ctx, o.arguments);
                }, o.wait);
            }
        };
    },
};

export default utils;
