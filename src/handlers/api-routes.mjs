import { DEFAULT_DB_POPULATION_PROJECTION } from '../defaults.mjs'

export const apiPopulationGetRouteHandler = async (request, response, db) => {

    db.findOne({
        cityAndState: `${request.params.city.toUpperCase()}, ${request.params.state.toUpperCase()}`,
    },
    DEFAULT_DB_POPULATION_PROJECTION,
    function dbPopulationGetRouteFindOneHandler(err, doc) {
        let payload

        if (err || !doc) {
                response.writeHead(400, { 'Content-Type': 'application/json' })
            payload = {
                status: 'error',
                message: 'State / City combination cannot be found.',
            }
        } else {
                response.writeHead(200, { 'Content-Type': 'application/json' })
            payload = doc
        }
        
            return response.end(JSON.stringify(payload))
    })
}

export const apiPopulationPutRouteHandler = async (request, response, db) => {

    const { state, city } = request.params
    const cityAndState = `${city.toUpperCase()}, ${state.toUpperCase()}`
    const population = parseInt(request.body)

    if (!Number.isInteger(population)) {
        response.writeHead(400)
        const payload = { status: 'error', message: 'Population value is not a number.' }
        return response.end(JSON.stringify(payload))
    }

    db.update({
        cityAndState, 
    },
    {
        $set: {
            cityAndState,
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
            const payload = { status: 'error', message: 'Error occurred while trying to complete this request.' }
            response.writeHead(400)
            return response.end(JSON.stringify(payload))
        } else if (!upsert) {
            response.writeHead(200)
        } else {
            response.writeHead(201)
        }

        return response.end()
    })

}

export default {
    apiPopulationGetRouteHandler,
    apiPopulationPutRouteHandler,
}
