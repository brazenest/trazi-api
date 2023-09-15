import fs from 'fs'

import dataAsJson from '../data/populations.json' assert { type: 'json' }

const filename = './data/populations.json'

const formattedData = dataAsJson.map(record => {
    if (!record.cityAndState) {
        record.cityAndState = `${record.city}, ${record.state}`
    }

    return record
})

console.log('Writing file', filename, '...')

fs.writeFile(filename, JSON.stringify(formattedData), (err) => {
    if (err) {
        console.error('ERROR:', err)
    } else {
        console.log('File successfully written.')
    }
})
