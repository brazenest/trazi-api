import Datastore from 'nedb'
import express from "express"

import { DEFAULT_DATABASE_FILE } from "./defaults.mjs"
import { apiPopulationGetRouteHandler, apiPopulationPutRouteHandler } from "./handlers/api-routes.mjs"
import { dbInitializationCountHandler } from './handlers/db-queries.mjs'

export const build = () => {
    const database = new Datastore({
        autoload: true,
        filename: DEFAULT_DATABASE_FILE,
    })
    const app = express()
    app.use(express.text())

    database.count({}, (err, count) => dbInitializationCountHandler(err, count, database))

    app.route('/api/population/state/:state/city/:city')
        .get((request, response) => apiPopulationGetRouteHandler(request, response, database))
        .put((request, response) => apiPopulationPutRouteHandler(request, response, database))

    return app
}

export default build
