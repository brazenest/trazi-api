import Datastore from 'nedb'

import { DEFAULT_DATABASE_FILE } from './defaults.mjs'

export const build = () => {
    const db = new Datastore({
        autoload: true,
        filename: DEFAULT_DATABASE_FILE,
    })

    return db
}

export default build
