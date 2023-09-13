import dataAsJson from '../../data/populations.json' assert { type: 'json' }

export const dbInitializationCountHandler = (err, count, db) => {
    if (count < 1) {
        console.log('generating database ...')
        dataAsJson.forEach(cityRecord => {
            const { state, city, population } = cityRecord
            db.insert({
                indexState: (typeof state === 'string') ? state.toUpperCase() : state,
                indexCity: (typeof city === 'string') ? city.toUpperCase() : city,
                state,
                city,
                population,
            }, function dbInitializationInsertHandler(err, newDoc) {
                console.log(`Added record "${newDoc.city}" for ${newDoc.state}`)
            })
        })
        db.ensureIndex({
            fieldName: ['state', 'city'],
            strength: 2,
        })
    }
}

export default {
    dbInitializationCountHandler,
}
