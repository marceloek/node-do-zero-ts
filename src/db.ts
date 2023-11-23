import 'dotenv/config'

import postgres from 'postgres'

const { PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD } = process.env

const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`

export const sql = postgres(URL)
