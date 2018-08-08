import CssRender from './components/css-render';
import CanvasRender from './components/canvas-render';
import Digital from './components/digital';

class Clock {
    constructor(config) {
        this.config = Object.assign({
            selector: '.clock',
            color: '#000',
            bgColor: '#fff',
            hasTimeLabel: true,
            size: 500,
            digital: {
                fontSize: 12,
            },
        }, config);
        this.render(this.config);
        console.log('clock Rendered');
    }
    render(config) {
        switch (config.type) {
            case 'canvas':
                this.clock = new CanvasRender(config);
                break;
            case 'css':
                this.clock = new CssRender(config);
                break;
            case 'digital':
                this.clock = new Digital(config);
                break;
            default:
                this.clock = new CanvasRender(config);
        }
        return this.clock;
    }
    setTime(o) {
        
    }
}

export default Clock;