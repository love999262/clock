class Time {
    constructor() {}
    static getDate() {
        Time.date = new Date();
        return {
            date: Time._getDate,
            day: Time._getDay,
            month: Time._getMonth,
            year: Time._getYear,
            hours: Time._getHours,
            minutes: Time._getMinutes,
            seconds: Time._getSeconds,
        };
    }
    static convert(val) {
        if (Number(val) < 10) {
            val = '0' + val;
        } else {
            val = String(val);
        }
        return val;
    }
    static get _getDate() {
        return Time.convert(Time.date.getDate());
    }
    static get _getDay() {
        return Time.convert(Time.date.getDay());
    }
    static get _getMonth() {
        return Time.convert(Time.date.getMonth() + 1);
    }
    static get _getYear() {
        return Time.convert(Time.date.getFullYear());
    }
    static get _getHours() {
        return Time.convert(Time.date.getHours());
    }
    static get _getMinutes() {
        return Time.convert(Time.date.getMinutes());
    }
    static get _getSeconds() {
        return Time.convert(Time.date.getSeconds());
    }
}

export default Time;