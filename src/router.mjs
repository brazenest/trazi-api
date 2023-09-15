import { apiPopulationGetRouteHandler } from './handlers/api-routes.mjs'

export const router = async (request, response, db) => {
    let params

    if (request.method === 'GET') {
        params = request.url.match(/\/api\/population\/state\/([a-zA-Z]+)\/city\/([a-zA-Z]+)\/?/)

        if (params) {
            request.params = {
                state: params[1],
                city: params[2],
            }
            apiPopulationGetRouteHandler(request, response, db)
        } else {
            response.writeHead(200, { 'Content-Type': 'application/json' })
            return response.end(JSON.stringify({
                status: 'some-trouble',
                url: request.url,
            }))
        }
    }
    else if (request.method === 'PUT') {
        console.log('PUT route touched')
        return response.end()
    }
}

export default router
