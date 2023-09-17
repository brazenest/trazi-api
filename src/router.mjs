import { apiPopulationGetRouteHandler, apiPopulationPutRouteHandler } from './handlers/api-routes.mjs'

export const router = async (request, response, db) => {
    let params


    const populationRequestParams = request.url.match(/\/api\/population\/state\/([a-zA-Z]+)\/city\/([a-zA-Z]+)\/?/)

    if (populationRequestParams) {

        request.params = {
            state: populationRequestParams[1],
            city: populationRequestParams[2],
        }

        if (request.method === 'GET') {
            await apiPopulationGetRouteHandler(request, response, db)
        }
        else if (request.method === 'PUT') {
            await apiPopulationPutRouteHandler(request, response, db)
        }
    } else {
        return response.end(JSON.stringify({ status: 'error', message: 'Route does not exist.' }))
    }


}

export default router
