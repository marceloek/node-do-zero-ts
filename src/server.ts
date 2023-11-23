import { fastify } from 'fastify'

import { routes } from './routes.js'

export const server = fastify({
  logger: true,
})

server.register(routes)

server
  .listen({
    host: '0.0.0.0',
    port: parseInt(process.env.PORT ?? '3333', 10),
  })
  .catch(err => {
    server.log.error(err)
    process.exit(1)
  })
