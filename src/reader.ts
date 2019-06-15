import DataFrame from 'dataframe-js';
import { Request, Response } from "express";

const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');
const geoTz = require('geo-tz')

export class TimezoneController {

    public readAll(req: Request, res: Response) {
        geoTz.preCache();
        const src = path.join(path.dirname(fs.realpathSync(__filename)), '../src');

        DataFrame.fromCSV(src + "/timezone.csv").then((df, err) => {
            if (err) {
                res.send(err);
            }
            else {
                df = df.withColumn('date', (row) => {
                    // Getting timezone from Geo location
                    let timezone = geoTz(row.get('lat'), row.get('lng'))[0];
                    // Setting timezone and printing on the desired format
                    let date = moment.tz(Number(row.get('timestamp_utc')), timezone).format("DD/MM/YYYY hh:mm z ZZ").toString();
                    return date;
                });
                res.json(df.toJSON());
            }
        });
    }
}