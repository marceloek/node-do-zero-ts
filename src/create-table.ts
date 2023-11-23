import { sql } from './db.js'

sql`DROP TABLE IF EXISTS videos;`
  .then(() => {
    console.log('Table deleted!')
    return true
  })
  .catch(() => {
    console.log('Something went wrong!')
  })

sql`CREATE TABLE videos (id TEXT PRIMARY KEY, title TEXT, description TEXT, duration INTEGER);`
  .then(() => {
    console.log('Table created!')
    return true
  })
  .catch(() => {
    console.log('Something went wrong!')
  })
