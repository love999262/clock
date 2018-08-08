class Time {
    constructor() {
    }
    getDate() {
        this.date = new Date();
        return {
            date: this._getDate,
            day: this._getDay,
            month: this._getMonth,
            year: this._getYear,
            hours: this._getHours,
            minutes: this._getMinutes,
            seconds: this._getSeconds,
        };
    }
    convert(val) {
        if (Number(val) < 10) {
            val = '0' + val;
        }
        return val;
    }
    get _getDate() {
        return this.convert(this.date.getDate());
    }
    get _getDay() {
        return this.convert(this.date.getDay());
    }
    get _getMonth() {
        return this.convert(this.date.getMonth() + 1);
    }
    get _getYear() {
        return this.convert(this.date.getFullYear());
    }
    get _getHours() {
        return this.convert(this.date.getHours());
    }
    get _getMinutes() {
        return this.convert(this.date.getMinutes());
    }
    get _getSeconds() {
        return this.convert(this.date.getSeconds());
    }
}

export default Time;