import './scss/index.scss';
import Clock from './js/app';

if (window) {
    window.Clock = window.Clock || Clock;
} else {
    global.Clock = global.Clock || Clock;
}

export default Clock;