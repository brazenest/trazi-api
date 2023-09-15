import { build as buildServer } from './server.mjs'
import { build as buildDb } from './db.mjs'
import { dbInitializationCountHandler } from './handlers/db-queries.mjs'
import { DEFAULT_SERVER_PORT } from './defaults.mjs'

const db = buildDb()

db.count({}, (err, count) => dbInitializationCountHandler(err, count, db))

const server = buildServer({ db })

server.listen(DEFAULT_SERVER_PORT, () => {
    console.log(`Server is running at http://localhost:${DEFAULT_SERVER_PORT}`);
});
