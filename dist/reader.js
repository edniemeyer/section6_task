"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataframe_js_1 = require("dataframe-js");
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');
const geoTz = require('geo-tz');
const src = path.join(path.dirname(fs.realpathSync(__filename)), '../src');
geoTz.preCache();
dataframe_js_1.default.fromCSV(src + "/timezone.csv").then(df => {
    df.map(row => {
        console.log(row);
        // Getting timezone from Geo location
        let timezone = geoTz(row.get('lat'), row.get('lng'))[0];
        console.log(timezone);
        // Setting timezone and printing on the desired format
        console.log(moment.tz(Number(row.get('timestamp_utc')), timezone).format("DD/MM/YYYY hh:mm z ZZ").toString());
    });
});
// fs.createReadStream("./src/timezone.csv")
//     .pipe(csv())
//     .on('data', (row) => {
//         // Getting timezone from Geo location
//         let timezone = geoTz(row.lat, row.lng)[0];
//         console.log(timezone)
//         // Setting timezone and printing on the desired format
//         console.log(moment.tz(Number(row.timestamp_utc), timezone).format("DD/MM/YYYY hh:mm z ZZ").toString());
//     })
//     .on('end', () => {
//         console.log('CSV file successfully processed');
//     });
//# sourceMappingURL=reader.js.map