import './scss/index.scss';
import Clock from './js/app';

if (window) {
    window.Clock = Clock;
} else {
    global.Clock = Clock;
}

export default Clock;