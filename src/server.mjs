import app from './app.mjs'
import { DEFAULT_SERVER_PORT } from './defaults.mjs'

const server = app()

try {
    await server.listen(DEFAULT_SERVER_PORT)
    console.log(`Server listening on port ${DEFAULT_SERVER_PORT}`)
} catch (err) {
    server.log.error(err)
    process.exit(1)
}
