import http from 'http'

import router from './router.mjs'

export const build = ({ db }) => {
    const server = http.createServer((request, response) => {
        let bodyRaw = []

        if (response._hasBody) {
            request.on('data', data => {
                bodyRaw.push(data)
        
            })
            request.on('end', () => {
                request.body = Buffer.concat(bodyRaw).toString()
                return router(request, response, db)
            })
        } else {
            return router(request, response, db)
        }
        
    })

    return server
}

export default build
