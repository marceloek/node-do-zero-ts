import { randomUUID } from 'node:crypto'

import { sql } from './db.js'
import { IVideo, IVideoTable } from './types.js'

export class DatabasePostgres {
  async list(search?: string): Promise<IVideoTable[]> {
    let videos: IVideoTable[] = []

    if (search) {
      videos = await sql`SELECT * FROM videos WHERE title ilike %${search}%`
    } else {
      videos = await sql`SELECT * FROM videos`
    }

    return videos
  }

  async create(video: IVideo): Promise<void> {
    const videoId = randomUUID()

    const { description, duration, title } = video

    await sql`INSERT INTO videos (id, description, title, duration) VALUES (${videoId}, ${description}, ${title}, ${duration} )`
  }

  async update(id: string, video: IVideo): Promise<void> {
    const { description, duration, title } = video

    await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
  }

  async delete(id: string): Promise<void> {
    await sql`DELETE FROM videos WHERE id = ${id}`
  }
}
