import utils from './../utils/utils';
import Time from './../utils/time';
class Digital {
    constructor(config) {
        this.config = config;
        this.config = utils.extend(config, config.digital);
        this.container = utils.$(this.config.selector);
        this.config.size = this.container.clientWidth && (this.container.clientWidth > this.container.clientHeight) ? this.container.clientHeight : this.container.clientWidth;
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
    get digitalTemplate() {
        if (!this._digitalTpl) {
            this._digitalTpl = utils.parseToDOM(`
                <div class="${this.config.prefix}-digital">
                    <div class="${this.config.prefix}-digital-time"></div>
                    ${this.config.hasDay ? `<div class="${this.config.prefix}-digital-day"></div>` : ''}
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
    get dayNode() {
        return utils.find(this.digitalTemplate, `.${this.config.prefix}-digital-day`);
    }
    get timeText() {
        return `${Time.getDate().hours} : ${Time.getDate().minutes} : ${Time.getDate().seconds}`;
    }
    get weekText() {
        return `${Time.week[String(Number(Time.getDate().day))]}`;
    }
    get monthText() {
        return `${Time.month[String(Number(Time.getDate().month))]}`;
    }
    get dateText() {
        return `${Time.getDate().date}`;
    }
    get dateYear() {
        return `${Time.getDate().year}`;
    }
    isRenderDay() {
        if(!this.currentDate) {
            this.currentDate = this.dateText;
            return true;
        }
        if (this.currentDate !== this.dateText) {
            this.currentDate = this.dateText;
            return true;
        }
        return false;
    }
    getCss() {
        this.container.style.cssText += ';width: auto; height: auto;';
        this.timeNode.style.cssText += `;font-size: ${this.config.fontSize}px; font-family: ${this.config.fontFamily}; color: ${this.config.color}; background: ${this.config.bgColor}`;
        if (this.config.hasDay) {
            this.dayNode.style.cssText += `;font-size: ${this.config.fontSize}px; font-family: ${this.config.fontFamily}; color: ${this.config.color}; background: ${this.config.bgColor}`;
        }
        this.container.appendChild(this.digitalTemplate);
    }
    renderCanvasText() {
        this.ctx.font = `${this.config.fontSize}px ${this.config.fontFamily}`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = this.config.color;
    }
    cssRender() {
        this.timeNode.innerText = this.timeText;
        if (this.config.hasDay && this.isRenderDay()) {
            this.dayNode.innerText = `${this.weekText} ${this.monthText} ${this.dateText} ${this.dateYear}`;
        }
    }
    getCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.renderCanvasText();
        this.size = this.ctx.measureText(this.timeText).width;
        if (this.config.hasDay) {
            this.size < this.ctx.measureText(`${this.weekText} ${this.monthText} ${this.dateText} ${this.dateYear}`).width ? this.size = this.ctx.measureText(`${this.weekText} ${this.monthText} ${this.dateText} ${this.dateYear}`).width : this.size = this.size;
        }
        this.size = Math.ceil(this.size);
        this.canvas.width = this.size;
        this.canvas.height = this.config.fontSize * (this.config.hasDay ? 3 : 2);
        this.container.appendChild(this.canvas);
    }
    canvasRenver() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.config.bgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderCanvasText();
        this.ctx.fillText(this.timeText, this.canvas.width / 2, this.config.fontSize);
        if (this.config.hasDay) {
            this.ctx.fillText(`${this.weekText} ${this.monthText} ${this.dateText} ${this.dateYear}`, this.canvas.width / 2, this.config.fontSize * 2);
        }
    }
}

export default Digital;