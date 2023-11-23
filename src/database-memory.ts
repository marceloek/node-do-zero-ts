import { randomUUID } from 'node:crypto'

import { IVideo, IVideoTable } from './types.js'

export class DatabaseMemory {
  #videos = new Map<string, IVideoTable>()

  list(search?: string): IVideoTable[] {
    const videos = Array.from(this.#videos.values()).filter(video => {
      return search ? video.title.includes(search) : true
    })

    return videos
  }

  create(video: IVideo): void {
    const videoId = randomUUID()

    this.#videos.set(videoId, { id: videoId, ...video })
  }

  update(id: string, video: IVideo): void {
    const videoExists = this.#videos.has(id)

    if (videoExists) this.#videos.set(id, { id, ...video })
  }

  delete(id: string): void {
    this.#videos.delete(id)
  }
}
