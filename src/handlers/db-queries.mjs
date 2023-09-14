import dataAsJson from '../../data/populations.json' assert { type: 'json' }

export const dbInitializationCountHandler = (err, count, db) => {
    if (count < 1) {
        console.log('generating database ...')
        dataAsJson.forEach(cityRecord => {
            const { state, city, population } = cityRecord
            db.insert({
                cityAndState: `${city}, ${state}`.toUpperCase(),
                state,
                city,
                population,
            }, function dbInitializationInsertHandler(err, newDoc) {
                console.log(`Added record "${newDoc.city}" for ${newDoc.state}`)
            })
        })
        db.ensureIndex({
            fieldName: 'cityAndState',
        })
    }
}

export default {
    dbInitializationCountHandler,
}
