import { FastifyInstance } from 'fastify'

// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'
import { IVideo } from './types.js'

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

export async function routes(server: FastifyInstance) {
  server.get('/', (_, rep) => {
    return rep.status(200).send({ hello: 'world' })
  })

  server.get('/create-table', async (_, rep) => {
    await database.createTable()

    return rep
  })

  server.post('/videos', async (req, rep) => {
    const { title, description, duration } = req.body as IVideo

    await database.create({ title, description, duration })

    return rep.status(201).send()
  })

  server.get('/videos', async (req, rep) => {
    const { search } = req.query as { search?: string }

    const videos = await database.list(search)

    return rep.status(200).send(videos)
  })

  server.put('/videos/:id', async (req, rep) => {
    const videoId = (req.params as { id: string }).id

    const { title, description, duration } = req.body as IVideo

    await database.update(videoId, { title, description, duration })

    return rep.status(204).send()
  })

  server.delete('/videos/:id', async (req, rep) => {
    const videoId = (req.params as { id: string }).id

    await database.delete(videoId)

    return rep.status(204).send()
  })
}
