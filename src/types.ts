interface IVideo {
  title: string
  description: string
  duration: number
}

interface IVideoTable extends IVideo {
  id: string
}

export { IVideo, IVideoTable }
