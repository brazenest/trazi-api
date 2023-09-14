import { DEFAULT_POPULATION_PROJECTION } from '../defaults.mjs'

export const apiPopulationGetRouteHandler = (request, response, db) => {

    db.findOne({
        cityAndState,
    },
    DEFAULT_POPULATION_PROJECTION,
    function dbPopulationGetRouteFindOneHandler(err, doc) {
        let payload

        if (err || !doc) {
            response.statusCode = 400
            payload = {
                status: 'error',
                message: 'State / City combination cannot be found.',
            }
        } else {
            response.statusCode = 200
            payload = doc
        }
        
        response.send(payload)
        return response
    })
    
}

export const apiPopulationPutRouteHandler = (request, response, db) => {

    const { state, city } = request.params
    const indexState = state.toUpperCase()
    const indexCity = city.toUpperCase()
    const population = parseInt(request.body)

    if (!Number.isInteger(population)) {
        response.statusCode = 400
        response.send()
        return response
    }

    db.update({
        indexState,
        indexCity,
    },
    {
        $set: {
            indexState,
            indexCity,
            state,
            city,
            population,
        },
    },
    {
        upsert: true,
    },
    function dbPopulationPutRouteUpdateHandler(err, numUpdated, updatedDoc, upsert) {

        if (err) {
            response.statusCode = 400
        } else if (!upsert) {
            response.statusCode = 200
        } else {
            response.statusCode = 201
        }

        response.send()
        return response
    })

}

export default {
    apiPopulationGetRouteHandler,
    apiPopulationPutRouteHandler,
}
