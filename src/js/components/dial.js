import Time from './../utils/time';
import utils from './../utils/utils';
class Dial {
    constructor(config) {
        this.config = config;
        this.container = utils.$(this.config.selector);
        this.size = this.container.clientWidth && (this.container.clientWidth > this.container.clientHeight) ? this.container.clientHeight : this.container.clientWidth;
        this.hasBorder = this.config.dial.hasBorder;
        this.hasTimeLabel = this.config.dial.hasTimeLabel;
        if (this.size <= 50) {
            this.isSmall = true;
        }
        this.prefix = this.config.prefix;
        console.log('width', this.container.width);
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
    get dialTemplate() {
        if (!this._dialTpl) {
            this._dialTpl = utils.parseToDOM(`
                <div class="${this.prefix}">
                    <div class="${this.prefix}-panel">
                        <div class="${this.prefix}-doc"></div>
                        <div class="${this.prefix}-hour">
                            <div class="${this.prefix}-hour-hand"></div>
                        </div>
                        <div class="${this.prefix}-minute">
                            <div class="${this.prefix}-minute-hand"></div>
                        </div>
                        <div class="${this.prefix}-second">
                            <div class="${this.prefix}-second-hand"></div>
                        </div>
                        <div class="${this.prefix}-timelabel">
                        </div>
                    </div>
                </div>
            `);
        }
        return this._dialTpl;
    }
    get hourNode() {
        return utils.find(this.dialTemplate, `.${this.prefix}-hour`);
    }
    get minuteNode() {
        return utils.find(this.dialTemplate, `.${this.prefix}-minute`);
    }
    get secondNode() {
        return utils.find(this.dialTemplate, `.${this.prefix}-second`);
    }
    get doc() {
        return utils.find(this.dialTemplate, `.${this.prefix}-doc`);
    }
    get panel() {
        return utils.find(this.dialTemplate, `.${this.prefix}-panel`);
    }
    get timeLabel() {
        return utils.find(this.dialTemplate, `.${this.prefix}-timelabel`);
    }
    getCss() {
        if (this.size) {
            if (this.isSmall) {
                utils.addClass(this.dialTemplate, 'mode-small');
            }
            if (this.config.color) {
                this.panel.style.cssText += `;border: 1px solid ${this.config.color};`;
                utils.find(this.hourNode, `.${this.prefix}-hour-hand`).style.cssText += `;background-color: ${this.config.color};`;
                utils.find(this.minuteNode, `.${this.prefix}-minute-hand`).style.cssText += `;background-color: ${this.config.color};`;
                utils.find(this.secondNode, `.${this.prefix}-second-hand`).style.cssText += `;background-color: ${this.config.color};`;
                this.doc.style.cssText += `;background-color: ${this.config.color};`;
            }
            if (this.config.bgColor) {
                this.panel.style.cssText += `;background-color: ${this.config.bgColor};`;
            }
            if (!this.hasBorder) {
                this.panel.style.cssText += ';border: none;';
            }
            if (this.hasTimeLabel && this.size >= 120) {
                this.timeLabel.style.cssText += `;font-size: ${this.size / 10}px; width: ${this.size / 10}px; height: ${this.size / 2}px;`;
                this.renderTimeLabel();
            }
            this.dialTemplate.style.cssText += `;width: ${this.size}px; height: ${this.size}px;`;
        }
        this.container.appendChild(this.dialTemplate);
    }
    cssRender() {
        this.hourNode.style.cssText += `;transform: translateY(-100%) rotate(${this.getAngle().h}deg);`;
        this.minuteNode.style.cssText += `;transform: translateY(-100%) rotate(${this.getAngle().m}deg);`;
        this.secondNode.style.cssText += `;transform: translateY(-100%) rotate(${this.getAngle().s}deg);`;
    }
    getCanvas() {
        const ele = document.createElement('canvas');
        ele.width = this.size;
        ele.height = this.size;
        this.ctx = ele.getContext('2d');
        const ctx = this.ctx;
        if (this.hasBorder) {
            ctx.strokeStyle = this.config.color;
        }
        ctx.fillStyle = this.config.bgColor;
        ctx.beginPath();
        const center = this.size / 2;
        const radius = this.size / 2;
        // draw panel
        ctx.arc(center, center, radius, 0, 2 * Math.PI, false);
        // translate center
        ctx.translate(center, center);
        // if (this.config.hasTimeLabel) {
        //     this.renderTimeLabel(ctx);
        // }
        // draw second handle
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -radius * .9);
        // draw minute handle
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -radius * .8);
        // draw hour hand
        ctx.moveTo(0, 0);
        ctx.lineTo(-radius * .5, 0);
        ctx.stroke();
        this.container.appendChild(ele);
    }
    canvasRender() {

    }
    createLabel(key) {
        return utils.parseToDOM(`<div class="${this.prefix}-timelabel-label" data-label=${key}><span class="${this.prefix}-timelabel-label-key">${key}</span></div>`);
    }
    renderTimeLabel() {
        for (let i = 1; i <= 12; i++) {
            const label = this.createLabel(i);
            label.style.cssText += `;transform: rotate(${(360 / 12) * i}deg); color: ${this.config.color};`;
            this.timeLabel.appendChild(label);
        }
    }
    getAngle() {
        const hour = Number(Time.getDate().hours);
        const minute = Number(Time.getDate().minutes);
        const second = Number(Time.getDate().seconds);
        const minPer = minute / 60;
        const secPer = second / 60;
        let secondAngle = ((360 / 60) * second) + (1 / 4) * 360;
        let minuteAngle = ((360 / 60) * (minute + secPer)) + (1 / 4) * 360;
        let hourAngle = ((360 / 12) * (hour + minPer)) + (1 / 4) * 360;
        return {
            m: minuteAngle,
            h: hourAngle,
            s: secondAngle,
        };
    }
}

export default Dial;
