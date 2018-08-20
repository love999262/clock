import './scss/index.scss';

import Clock from './js/app';
if (global) {
    global.Clock = global.Clock || Clock;
} else {
    window.Clock = window.Clock || Clock;
}
export default Clock;