import Dial from './components/dial';
import Digital from './components/digital';
import utils from './utils/utils';

class Clock {
    constructor(config) {
        this.config = utils.extend({
            selector: '.clock',
            type: 'dial',
            renderType: 'canvas',
            color: '#fff',
            bgColor: 'rgba(0, 0, 0, .35)',
            prefix: 'kaguya-clock',
            draggable: true,
            dial: {
                hasTimeLabel: true,
                hasBorder: true,
            },
            digital: {
                fontSize: 12,
                fontFamily: 'Arial',
            },
        }, config);
        console.log('config', this.config);
        this.render(this.config);
        console.log('clock Rendered');
    }
    render(config) {
        switch (config.type) {
            case 'dial':
                this.clock = new Dial(config);
                break;
            case 'digital':
                this.clock = new Digital(config);
                break;
            default:
                this.clock = new Digital(config);
        }
        return this.clock;
    }
}

export default Clock;