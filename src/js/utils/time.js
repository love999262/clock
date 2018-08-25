class Time {
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
    static get week() {
        return {
            '1': 'Mon',
            '2': 'Tue',
            '3': 'Wed',
            '4': 'Thur',
            '5': 'Fri',
            '6': 'Sat',
            '0': 'Sun',
            'Mon': '1',
            'Tues': '2',
            'Wed': '3',
            'Thur': '4',
            'Fri': '5',
            'Sat': '6',
            'Sun': '0',
        };
    }
    static get month() {
        return {
            '1': 'Jan',
            '2': 'Feb',
            '3': 'Mar',
            '4': 'Apr',
            '5': 'May',
            '6': 'Jun',
            '7': 'Jul',
            '8': 'Aug',
            '9': 'Sept',
            '10': 'Oct',
            '11': 'Nov',
            '12': 'Dec',
            'Jan': '1',
            'Feb': '2',
            'Mar': '3',
            'Apr': '4',
            'May': '5',
            'Jun': '6',
            'Jul': '7',
            'Aug': '8',
            'Sept': '9',
            'Oct': '10',
            'Nov': '11',
            'Dec': '12',
        };
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