interface DialInterface {
    hasTimeLabel?: true,
    hasBorder?: true,
}
interface DigitalInterface {
    fontSize?: number;
    fontFamily?: string;
    hasDay?: boolean;
}

interface ConfigInterface {
    selector: string;
    type?: string;
    renderType?: string;
    draggable?: boolean;
    color?: string;
    bgColor?: string;
    prefix?: string;
    dial?: DialInterface;
    digital?: DigitalInterface;
}
declare class Clock {
    constructor(config: ConfigInterface)
}

export default Clock;
