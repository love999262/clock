import utils from './../utils/utils';
import Time from './../utils/time';
class Digital {
    constructor(config) {
        this.config = config;
        this.container = utils.$(this.config.selector);
        switch (this.config.renderType) {
            case 'css':
                this.getCss();
                utils.render(this.cssRender, this);
                break;
            case 'canvas':
                this.getCanvas();
                utils.render(this.canvasRenver, this);
                break;
            default:
                this.getCss();
                utils.render(this.cssRender, this);
        }

    }
    getTime() {
        return `${Time.getDate().hours} : ${Time.getDate().minutes} : ${Time.getDate().seconds}`;
    }
    get digitalTemplate() {
        if (!this._digitalTpl) {
            this._digitalTpl = utils.parseToDOM(`
                <div class="${this.config.prefix}-digital">
                    <div class="${this.config.prefix}-digital-time"></div>
                    <div class="${this.config.prefix}-digital-week"></div>
                    <div class="${this.config.prefix}-digital-month"></div>
                </div>
            `);
        }
        return this._digitalTpl;
    }
    get timeNode() {
        return utils.find(this.digitalTemplate, `.${this.config.prefix}-digital-time`);
    }
    get weekNode() {
        return utils.find(this.digitalTemplate, `.${this.config.prefix}-digital-week`);
    }
    get monthNode() {
        return utils.find(this.digitalTemplate, `.${this.config.prefix}-digital-month`);
    }
    getCss() {
        this.timeNode.style.cssText += `;font-size: ${this.config.digital.fontSize}px; font-family: ${this.config.fontFamily} color: ${this.config.digital.color}; white-space: nowrap`;
        this.weekNode.style.cssText += `;font-size: ${this.config.digital.fontSize}px; font-family: ${this.config.fontFamily} color: ${this.config.digital.color}; white-space: nowrap`;
        this.monthNode.style.cssText += `;font-size: ${this.config.digital.fontSize}px; font-family: ${this.config.fontFamily} color: ${this.config.digital.color}; white-space: nowrap`;
        this.container.appendChild(this.digitalTemplate);
    }
    cssRender() {
        this.timeNode.innerText = this.getTime();
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