import utils from './../utils/utils';
import Time from './time';
class Digital {
    constructor(config) {
        this.config = config;
        this.time = new Time();
        this.container = utils.$(this.config.selector)[0];
        switch (this.config.renderType) {
            case 'css':
                this.render(this.cssRender);
                break;
            case 'canvas':
                this.getCanvas();
                this.render(this.canvasRenver);
                break;
            default:
                this.render(this.cssRender);
        }

    }
    render(callback) {
        if (!(typeof callback === 'function')) {
            return false;
        }
        callback.call(this);
        utils.loop(callback.bind(this));
    }
    getTime() {
        return this.time.getDate();
    }
    getText() {
        return `${this.getTime().hours} : ${this.getTime().minutes} : ${this.getTime().seconds}`;
    }
    cssRender() {
        this.container.style.cssText += `;font-size: ${this.config.digital.fontSize}px; color: ${this.config.digital.color};`;
        this.container.innerText = this.getText();
    }
    getCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.config.size;
        this.canvas.height = this.config.size;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = `${this.config.digital.fontSize}px Arial`;
        this.container.appendChild(this.canvas);
    }
    canvasRenver() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillText(this.getText(), 0, this.config.digital.fontSize);
    }
}

export default Digital;