import { apiPopulationGetRouteHandler, apiPopulationPutRouteHandler } from './handlers/api-routes.mjs'

export const router = async (request, response, db) => {
    let params


    if (/\/api\/population\/state\/([a-zA-Z]+)\/city\/([a-zA-Z]+)\/?/.test(request.url)) {

        params = request.url.match(/\/api\/population\/state\/([a-zA-Z]+)\/city\/([a-zA-Z]+)\/?/)

        request.params = {
            state: params[1],
            city: params[2],
        }

        if (request.method === 'GET') {
            apiPopulationGetRouteHandler(request, response, db)
        }
        else if (request.method === 'PUT') {
            apiPopulationPutRouteHandler(request, response, db)
        }
    } else {
        return response.end(JSON.stringify({ status: 'error', message: 'Route does not exist.' }))
    }


}

export default router
