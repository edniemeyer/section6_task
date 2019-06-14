const csv = require('csv-parser');
const fs = require('fs');

let data = [];

fs.createReadStream("./src/timezone.csv")
    .pipe(csv())
    .on('data', (row) => {
        console.log(row);
        data.push(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        console.log(data);
    });
