import { RenderableDocument } from '~/components/ContentEditor/types'

export interface Content {
  document: RenderableDocument
}

export type Cache = { [slug: string]: Content }

export class NotFound extends Error {
  filepath: string

  constructor(filepath: string) {
    super(`No such file, open '${filepath}'`)

    this.filepath = filepath
  }
}
