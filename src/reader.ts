import DataFrame from 'dataframe-js';

const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');
const geoTz = require('geo-tz');
const haversine = require('haversine');

export class TimezoneController {

    private df;

    constructor() {
        geoTz.preCache();
        const src = path.join(path.dirname(fs.realpathSync(__filename)), '../src');

        DataFrame.fromCSV(src + "/timezone.csv").then((df, err) => {
            if (err) {
                throw (err);
            }
            else {
                this.df = df.withColumn('date', (row) => {
                    // Getting timezone from Geo location
                    let timezone = geoTz(row.get('lat'), row.get('lng'))[0];
                    // Setting timezone and printing on the desired format
                    let date = moment.tz(Number(row.get('timestamp_utc')), timezone).format("DD/MM/YYYY hh:mm z ZZ").toString();
                    return date;
                });
            }
        });
    }

    public readAll() {
        return this.df.toJSON();
    }

    public getId(id: string) {
        return this.df.filter(row => row.get("id") == id).select("date");
    }

    public calculateDistance() {
        let result = [];
        let count_df = this.df.groupBy("id")
            .aggregate((group) => group.count())
            .filter(row => row.get("aggregation") > 1);
        if (count_df.count() > 0) {
            let ids = count_df.select("id").toArray().flat(1);
            ids.forEach(id => {
                let lats = [];
                let lngs = [];
                this.df.filter((row => row.get("id") == id))
                    .sortBy("timestamp_utc")
                    .select("id", "lat", "lng")
                    .map((row) => {
                        lats.push(row.get("lat"));
                        lngs.push(row.get("lng"));
                    });
                // As it is ordered by timestamp, we get the last 2 elements from the array, 
                // which are the actual measurement and the last meauserd position
                const start = {
                    latitude: lats[lats.length - 2],
                    longitude: lngs[lngs.length - 2]
                }
                const end = {
                    latitude: lats[lats.length - 1],
                    longitude: lngs[lngs.length - 1]
                }
                // calculating distances
                let distance = haversine(start, end);
                result.push({
                    id,
                    distance
                });
            });
            return result;
        } else {
            throw new Error("No data with same ids present to calculate distances");
        }
    }
}