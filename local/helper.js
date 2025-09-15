// Math Database
const _math = {};
    // Get Random Number with only max
    _math.GetRnd = function (max) {
        return Math.floor(Math.random() * max);
    }
    // Get Random Number Between min and max
    _math.GetRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }