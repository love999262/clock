interface DialInterface {
    hasTimeLabel?: true,
    hasBorder?: true,
}

interface DigitalInterface {
    fontSize?: string;
}

interface ConfigInterface {
    selector: string;
    type?: string;
    renderType?: string;
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
