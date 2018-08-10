class Dial {
    constructor(config) {
        this.render();
    }
    render() {
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
        document.querySelectorAll(this.config.selector)[0].appendChild(ele);
    }
    renderTimeLabel(text) {
        const radius = this.config.size / 2;
        this.ctx.fillText(text, 0, -radius * .8);
    }
}

export default Dial;
