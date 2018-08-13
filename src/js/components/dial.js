import Time from './time';
import utils from './../utils/utils';
class Dial {
    constructor(config) {
        this.config = config;
        this.container = utils.$(this.config.selector);
        this.size = this.container.offsetWidth && (this.container.offsetWidth > this.container.offsetHeight) ? this.container.offsetHeight : this.container.offsetWidth;
        this.size -= 4;
        this.time = new Time();
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
                    </div>
                </div>
            `);
        }
        return this._dialTpl;
    }
    get hourHand() {
        return utils.find(this.dialTemplate, `.${this.prefix}-hour`);
    }
    get minuteHand() {
        return utils.find(this.dialTemplate, `.${this.prefix}-minute`);
    }
    get secondHand() {
        return utils.find(this.dialTemplate, `.${this.prefix}-second`);
    }
    getCss() {
        if (this.size) {
            this.dialTemplate.style.cssText += `;width: ${this.size}px; height: ${this.size}px;`;
        }
        this.container.appendChild(this.dialTemplate);
    }
    cssRender() {
        this.hourHand.style.cssText += `;transform: translateY(-100%) rotate(${this.getAngle().h}deg);`;
        this.minuteHand.style.cssText += `;transform: translateY(-100%) rotate(${this.getAngle().m}deg);`;
        this.secondHand.style.cssText += `;transform: translateY(-100%) rotate(${this.getAngle().s}deg);`;
    }
    getCanvas() {
        const ele = document.createElement('canvas');
        ele.width = this.config.size;
        ele.height = this.config.size;
        this.ctx = ele.getContext('2d');
        const ctx = this.ctx;
        ctx.beginPath();
        const center = this.config.size / 2;
        const radius = this.config.size / 2;
        ctx.strokeStyle = this.config.color;
        // draw panel
        ctx.arc(center, center, radius, 0, 2 * Math.PI, false);
        // translate center
        ctx.translate(center, center);
        if (this.config.hasTimeLabel) {
            this.renderTimeLabel(ctx);
        }
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
    renderTimeLabel(text) {
        const radius = this.config.size / 2;
        this.ctx.fillText(text, 0, -radius * .8);
    }
    getAngle() {
        const hour = Number(Time.getDate().hours);
        const minute = Number(Time.getDate().minutes);
        const second = Number(Time.getDate().seconds);
        const minPer = minute / 60;
        const secPer = second / 60;
        let secondAngle = (360 / 60) * second;
        let minuteAngle = (360 / 60) * (minute + secPer);
        let hourAngle = (360 / 12) * (hour + minPer);
        return {
            m: minuteAngle,
            h: hourAngle,
            s: secondAngle,
        };
    }
}

export default Dial;
