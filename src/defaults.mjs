export const DEFAULT_DATABASE_FILE = './data/populations.db'

export const DEFAULT_NEDB_PROJECTION = {
    _id: 0,
}

export const DEFAULT_POPULATION_PROJECTION = {
    _id: 0,
    indexState: 0,
    indexCity: 0,
    state: 0,
    city: 0,
}

export const DEFAULT_SERVER_PORT = 5555

export default {
    DEFAULT_DATABASE_FILE,
    DEFAULT_NEDB_PROJECTION,
    DEFAULT_POPULATION_PROJECTION,
    DEFAULT_SERVER_PORT,
}
