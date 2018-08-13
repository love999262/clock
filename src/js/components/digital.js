import utils from './../utils/utils';
import Time from './../utils/time';
class Digital {
    constructor(config) {
        this.config = config;
        this.container = utils.$(this.config.selector);
        switch (this.config.renderType) {
            case 'css':
                utils.render(this.cssRender, this);
                break;
            case 'canvas':
                this.getCanvas();
                utils.render(this.canvasRenver, this);
                break;
            default:
                utils.render(this.cssRender, this);
        }

    }
    getTime() {
        return Time.getDate();
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