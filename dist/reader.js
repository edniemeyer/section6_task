"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataframe_js_1 = require("dataframe-js");
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');
const geoTz = require('geo-tz');
class TimezoneController {
    readAll(req, res) {
        geoTz.preCache();
        const src = path.join(path.dirname(fs.realpathSync(__filename)), '../src');
        dataframe_js_1.default.fromCSV(src + "/timezone.csv").then((df, err) => {
            if (err) {
                res.send(err);
            }
            else {
                df = df.withColumn('date', (row) => {
                    // Getting timezone from Geo location
                    let timezone = geoTz(row.get('lat'), row.get('lng'))[0];
                    // Setting timezone and printing on the desired format
                    let date = moment.tz(Number(row.get('timestamp_utc')), timezone).format("DD/MM/YYYY hh:mm z ZZ").toString();
                    console.log(date);
                    return date;
                });
                res.json(df.toJSON());
            }
        });
    }
}
exports.TimezoneController = TimezoneController;
//# sourceMappingURL=reader.js.map