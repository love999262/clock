import Dial from './components/dial';
import Digital from './components/digital';
import utils from './utils/utils';

class Clock {
    constructor(config) {
        this.config = utils.extend({
            selector: '.clock',
            color: '#000',
            bgColor: '#fff',
            type: 'digital',
            hasTimeLabel: true,
            size: 500,
            renderType: 'css',
            digital: {
                fontSize: 12,
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
    setTime(o) {
        
    }
}

export default Clock;