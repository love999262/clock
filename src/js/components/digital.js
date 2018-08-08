
import utils from './../utils/utils';
import Time from './time';
class Digital {
    constructor(config) {
        this.config = config;
        this.time = new Time();
        this.container = utils.$(this.config.selector)[0];
        this.render();
        setInterval(() => {
            this.render();
        }, 1000);
    }
    getTime() {
        return this.time.getDate();
    }
    render() {
        this.container.style.cssText += `;font-size: ${this.config.digital.fontSize}px; color: ${this.config.digital.color};`;
        this.container.innerText = `${this.getTime().hours} : ${this.getTime().minutes} : ${this.getTime().seconds}`;
    }
}

export default Digital;