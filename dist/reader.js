const csv = require('csv-parser');
const fs = require('fs');
const moment = require('moment-timezone');
let data = [];
fs.createReadStream("./src/timezone.csv")
    .pipe(csv())
    .on('data', (row) => {
    console.log(row.timestamp_utc);
    console.log(moment().tz(Number(row.timestamp_utc)).format("DD/MM/YYYY hh:mm z ZZ").toString());
    data.push(row);
})
    .on('end', () => {
    console.log('CSV file successfully processed');
    // console.log(data);
});
//# sourceMappingURL=reader.js.map