import Time from './../utils/time';
import utils from './../utils/utils';
class Dial {
    constructor(config) {
        this.config = config;
        this.config = utils.extend(config, config.dial);
        this.container = utils.$(this.config.selector);
        this.config.size = this.container.clientWidth && (this.container.clientWidth > this.container.clientHeight) ? this.container.clientHeight : this.container.clientWidth;
        if (this.config.size <= 50) {
            this.config.isSmall = true;
        } else if(this.config.size >= 300) {
            this.config.isLarge = true;
        }
        console.log('width', this.container.width);
        switch (this.config.renderType) {
            case 'css':
                this.getCss();
                utils.render(this.cssRender, this);
                break;
            case 'canvas':
                this.getCanvas();
                utils.render(this.canvasRender, this);
                break;
            default:
                this.getCss();
                utils.render(this.cssRender, this);
        }
    }
    get dialTemplate() {
        if (!this._dialTpl) {
            this._dialTpl = utils.parseToDOM(`
                <div class="${this.config.prefix}">
                    <div class="${this.config.prefix}-panel">
                        <div class="${this.config.prefix}-doc"></div>
                        <div class="${this.config.prefix}-hour">
                            <div class="${this.config.prefix}-hour-hand"></div>
                        </div>
                        <div class="${this.config.prefix}-minute">
                            <div class="${this.config.prefix}-minute-hand"></div>
                        </div>
                        <div class="${this.config.prefix}-second">
                            <div class="${this.config.prefix}-second-hand"></div>
                        </div>
                        <div class="${this.config.prefix}-timelabel">
                        </div>
                    </div>
                </div>
            `);
        }
        return this._dialTpl;
    }
    get hourNode() {
        return utils.find(this.dialTemplate, `.${this.config.prefix}-hour`);
    }
    get minuteNode() {
        return utils.find(this.dialTemplate, `.${this.config.prefix}-minute`);
    }
    get secondNode() {
        return utils.find(this.dialTemplate, `.${this.config.prefix}-second`);
    }
    get doc() {
        return utils.find(this.dialTemplate, `.${this.config.prefix}-doc`);
    }
    get panel() {
        return utils.find(this.dialTemplate, `.${this.config.prefix}-panel`);
    }
    get timeLabel() {
        return utils.find(this.dialTemplate, `.${this.config.prefix}-timelabel`);
    }
    getCss() {
        if (this.config.size) {
            if (this.config.isSmall) {
                utils.addClass(this.dialTemplate, 'mode-small');
            } else if(this.config.isLarge) {
                utils.addClass(this.dialTemplate, 'mode-large');
            }
            if (this.config.color) {
                this.panel.style.cssText += `;border: 1px solid ${this.config.color};`;
                utils.find(this.hourNode, `.${this.config.prefix}-hour-hand`).style.cssText += `;background-color: ${this.config.color};`;
                utils.find(this.minuteNode, `.${this.config.prefix}-minute-hand`).style.cssText += `;background-color: ${this.config.color};`;
                utils.find(this.secondNode, `.${this.config.prefix}-second-hand`).style.cssText += `;background-color: ${this.config.color};`;
                this.doc.style.cssText += `;background-color: ${this.config.color};`;
            }
            if (this.config.bgColor) {
                this.panel.style.cssText += `;background-color: ${this.config.bgColor};`;
            }
            if (!this.config.hasBorder) {
                this.panel.style.cssText += ';border: none;';
            }
            if (this.config.hasTimeLabel && this.config.size >= 80) {
                this.timeLabel.style.cssText += `;font-size: ${this.config.size / 10}px; width: ${this.config.size / 10}px; height: ${this.config.size / 2}px;`;
                this.renderTimeLabel();
            }
            this.dialTemplate.style.cssText += `;width: ${this.config.size}px; height: ${this.config.size}px;`;
        }
        this.container.appendChild(this.dialTemplate);
    }
    cssRender() {
        this.hourNode.style.cssText += `;transform: translateY(-100%) rotate(${this.getAngle(true).h}deg);`;
        this.minuteNode.style.cssText += `;transform: translateY(-100%) rotate(${this.getAngle(true).m}deg);`;
        this.secondNode.style.cssText += `;transform: translateY(-100%) rotate(${this.getAngle(true).s}deg);`;
    }
    getCanvas() {
        this.ele = document.createElement('canvas');
        this.ele.width = this.config.size;
        this.ele.height = this.config.size;
        this.ctx = this.ele.getContext('2d');
        this._getCanvas();
        this.container.appendChild(this.ele);
    }
    _getCanvas() {
        const ctx = this.ctx;
        ctx.strokeStyle = this.config.color;
        ctx.fillStyle = this.config.bgColor;
        this.center = this.config.size / 2;
        this.radius = this.config.size / 2;
        // draw panel

        ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.center, this.center);
        ctx.arc(0, 0, this.radius - 2, 0, 2 * Math.PI, false);
        ctx.fill();
        if (this.config.hasBorder) {
            ctx.stroke();
        }
        ctx.closePath();
        ctx.beginPath();
        let docRad = 5;
        if (this.config.isSmall) {
            docRad = 2;
        } else if (this.config.isLarge) {
            docRad = 10;
        }
        ctx.fillStyle = this.config.color;
        ctx.arc(0, 0, docRad, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        // draw timeLabel
        if (this.config.hasTimeLabel) {
            ctx.font = `${this.config.size / 10}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = this.config.color;
            this.renderCanvasTimeLabel();
        }
        this.ctx.restore();
    }
    drawHandle(key) {
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.center, this.center);
        this.ctx.moveTo(0, 0);
        switch (key) {
            case 'sec':
                this.ctx.lineWidth = 1;
                if (this.config.isSmall) {
                    this.ctx.lineWidth = 1;
                } else if (this.config.isLarge) {
                    this.ctx.lineWidth = 4;
                }
                this.ctx.rotate(utils.degtorad(this.getAngle().s));
                this.ctx.lineTo(0, -this.radius * .9);
                break;
            case 'min':
                this.ctx.lineWidth = 3;
                if (this.config.isSmall) {
                    this.ctx.lineWidth = 2;
                } else if (this.config.isLarge) {
                    this.ctx.lineWidth = 6;
                }
                this.ctx.rotate(utils.degtorad(this.getAngle().m));
                this.ctx.lineTo(0, -this.radius * .8);
                break;
            case 'hour':
                this.ctx.lineWidth = 5;
                if (this.config.isSmall) {
                    this.ctx.lineWidth = 3;
                } else if (this.config.isLarge) {
                    this.ctx.lineWidth = 8;
                }
                this.ctx.rotate(utils.degtorad(this.getAngle().h));
                this.ctx.lineTo(0, -this.radius * .5);
                break;
        }
        this.ctx.stroke();
        this.ctx.restore();
        this.ctx.closePath();
    }
    canvasRender() {
        this.ctx.clearRect(0, 0, this.config.size, this.config.size);
        this._getCanvas();
        this.drawHandle('sec');
        this.drawHandle('min');
        this.drawHandle('hour');
    }
    renderCanvasTimeLabel() {
        for (let i = 1; i <= 12; i++) {
            const rad = utils.degtorad(360 / 12);
            const textPosition = -this.radius + (this.config.size / 10);
            this.ctx.rotate(rad);
            this.ctx.save();
            this.ctx.translate(0, textPosition);
            this.ctx.rotate(-utils.degtorad(360 / 12) * i);
            this.ctx.fillText(String(i), 0, 0);
            this.ctx.restore();
        }
    }
    createLabel(key) {
        return utils.parseToDOM(`<div class="${this.config.prefix}-timelabel-label" data-label=${key}><div class="${this.config.prefix}-timelabel-label-key">${key}</div></div>`);
    }
    renderTimeLabel() {
        for (let i = 1; i <= 12; i++) {
            const label = this.createLabel(i);
            label.style.cssText += `;transform: rotate(${(360 / 12) * i}deg);`;
            utils.find(label, `.${this.config.prefix}-timelabel-label-key`).style.cssText += `;color: ${this.config.color}; transform: rotate(-${(360 / 12) * i}deg);`;
            this.timeLabel.appendChild(label);
        }
    }
    getAngle(isCss) {
        const hour = Number(Time.getDate().hours > 12 ? Time.getDate().hours : Number(Time.getDate().hours) - 12);
        const minute = Number(Time.getDate().minutes);
        const second = Number(Time.getDate().seconds);
        const minPer = minute / 60;
        const secPer = second / 60;
        let secondAngle = ((360 / 60) * second);
        let minuteAngle = ((360 / 60) * (minute + secPer));
        let hourAngle = ((360 / 12) * (hour + minPer));
        if (isCss) {
            hourAngle += 90;
            minuteAngle += 90;
            secondAngle += 90;
        }
        return {
            h: hourAngle,
            m: minuteAngle,
            s: secondAngle,
        };
    }
}

export default Dial;
