import http from 'http'

import router from './router.mjs'

export const build = ({ db }) => {
    const server = http.createServer((request, response) => router(request, response, db))

    return server
}

export default build
