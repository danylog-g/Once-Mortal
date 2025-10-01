// Math Library
const _math = {};
    // Get Random Number with an upper limit
    _math.GetRnd = function (max) {
        return Math.floor(Math.random() * max);
    }
    // Get a Random Number then Round to Num Decimal Places
    _math.GetRndRound = function (max, num) {
        return parseFloat(Math.floor(Math.random() * max), num);
    }
    // Get Random Number Between min and max
    _math.GetRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // Get a Random Number between Min and Max; then Round to Num Decimal Places
    _math.GetRandomRound = function (min, max, num) {
        return parseFloat(Math.floor(Math.random() * (max - min + 1)) + min, num);
    }
    // Convert Kilograms to Pounds
    _math.ConvertKgToLbs = function(kg) {
        return Math.round(kg * 2.20462);
    }
    // Convert Pounds to Kilograms
    _math.ConvertLbsToKg = function(lbs) {
        return Math.round(lbs / 2.20462);
    }
    // Convert Centimeters to Feet
    _math.ConvertCmToFt = function(cm) {
        let inches = Math.round(cm / 2.54);
        const ft = Math.floor(inches / 12);
        inches = inches % 12;

        return [ft, inches];
    }
    // Convert Most Measurements
    _math.ConvertFtToTrg = function(str, trg) {
        if (!str || typeof str != 'string') return console.error("Measurement String could not be identified");

        // Remove whitespace
        str = str.trim();

        // Regex pattern to match:
        // - Optional negative sign
        // - Digits with optional decimal point for feet
        // - Optional: digits with optional decimal point for inches
        const pattern = /^(-?\d*\.?\d+)'?\s*(-?\d*\.?\d+)?"?$/;

        const match = pattern.exec(str);

        let feet = parseFloat(match[1]) || 0.0;;
        let inches = parseFloat(match[2] || '0') || 0.0;;

        if (!match) {
            // Try alternative pattern for cases like "8.55'" (feet only with decimal)
            const altPattern = /^(-?\d*\.?\d+)'?$/;
            const altMatch = altPattern.exec(cleanStr);
            if (altMatch) {
                feet = parseFloat(altMatch[1]) || 0.0;
                return [feet, 0.0];
            } else {
                return console.error("Measurement String could not be parsed.");
            }
        }
        
        if (!trg || typeof trg != "string") return console.error("Target String could not be identified");
        
        if (trg === "cm") {
            return (feet*30.48)+(inches*2.54);
        }
        else if (trg === "m") {
            return (feet*0.3048)+(inches*0.0254);
        }
        else if (trg === "km") {
            return (feet*0.0003048)+(inches*0.0000254);
        }
        else {
            return [feet, inches];
        }
    }
// Array Library
_array = {};
    // Get random element from an array
    _array.getRElementFromArray = function(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
// Object Library
_object = {};

// Database Library
_database = {};

// Date Library
_date = {};
    // Convert Date to Date Type
    _date.ConvertDate = function(date, type) {
        if (!date) return console.error("Date could not be parsed.");

        const months_short = [ "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec" ];
        const months_long = [ "January","February","March","April","May","June","July","August","September","October","November","December" ];
        const days_short = [ "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun" ];
        const days_long = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];

        const n_date = {
            year: 0,
            week: 0,
            month_int: 0,
            month_str_short: "",
            month_str_long: "",
            day_int: 0,
            day_str_short: "",
            day_str_long: "",
        };

        if (typeof date == 'string') {
            date = date.trim();
            const patterns = [
                // Short Date
                /^([0-1][0-9])\S?\s?([0-3][0-9])\S?\s?([0-9][0-9][0-9][0-9])$/,
                // Long Date
                /^([A-Z]\S\S\S?\S?\S?\S?\S?\S?)\s?\S?([0-3][0-9])\s?\S?([0-9][0-9][0-9][0-9])?$/,
                /^([0-3][0-9])\s?\S?([A-Z]\S\S\S?\S?\S?\S?\S?\S?)\s?\S?([0-9][0-9][0-9][0-9])?$/,
            ]
            // Check if MM/DD/YYYY
            if (patterns[0].exec(date)) {
                date = patterns[0].exec(date);
            }
            // Check if Month/DD/YYYY
            else if (patterns[1].exec(date)) {
                date = patterns[1].exec(date);
            }
            // Check if DD/Month/YYYY
            else if (patterns[2].exec(date)) {
                date = patterns[2].exec(date);
            }
        }

        // Determine Type
        if (!type) {
            return console.error("Date Type could not be parsed.");
        }
        switch (type) {
            case "YYYY-MM-DD": return n_date.year +"-"+ n_date.month_int +"-"+ n_date.day_int;
            case "YYYY/MM/DD": return n_date.year +"/"+ n_date.month_int +"/"+ n_date.day_int;
            case "DD-MM-YYYY": return n_date.day_int +"/"+ n_date.month_int +"/"+ n_date.year;
            case "DD/MM/YYYY": return n_date.day_int +"/"+ n_date.month_int +"/"+ n_date.year;
            case "MM-DD-YYYY": return n_date.month_int +"/"+ n_date.day_int +"/"+ n_date.year;
            case "MM/DD/YYYY": return n_date.month_int +"/"+ n_date.day_int +"/"+ n_date.year;
            case "MS-DD-YYYY": return n_date.month_str_short +"/"+ n_date.day_int +"/"+ n_date.year;
            case "MS/DD/YYYY": return n_date.month_str_short +"/"+ n_date.day_int +"/"+ n_date.year;
            case "ML-DD-YYYY": return n_date.month_str_long +"/"+ n_date.day_int +"/"+ n_date.year;
            case "ML/DD/YYYY": return n_date.month_str_long +"/"+ n_date.day_int +"/"+ n_date.year;
        }
    }