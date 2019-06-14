const csv = require('csv-parser');
const fs = require('fs');
const moment = require('moment-timezone');
const geoTz = require('geo-tz')

let data = [];
geoTz.preCache();

fs.createReadStream("./src/timezone.csv")
    .pipe(csv())
    .on('data', (row) => {
        // Getting timezone from Geo location
        let timezone = geoTz(row.lat, row.lng)[0];
        console.log(timezone)
        // Setting timezone and printing on the desired format
        console.log(moment.tz(Number(row.timestamp_utc), timezone).format("DD/MM/YYYY hh:mm z ZZ").toString());
        data.push(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        // console.log(data);
    });
