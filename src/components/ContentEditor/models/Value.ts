import {
  createDocument,
  ImmutableDocument,
  ImmutableLayerType,
} from '~/components/ContentEditor/models/Document'
import Change from '~/components/ContentEditor/models/Change'
import { RenderableDocument } from '~/components/ContentEditor/types'
import { HistoryType } from '~/components/ContentEditor/models/History'
import Schema from '~/components/ContentEditor/models/Schema'
import { layerPathToKeyPath } from '~/components/ContentEditor/models/utils'

export type ChangeHandler = (change: Change) => Change

export interface Selection {
  layerPath: string
}

export default class Value {
  schema: Schema
  document: ImmutableDocument
  selection?: Selection
  history: HistoryType
  historyStackSize: number

  static fromJS(
    schema: Schema,
    document: RenderableDocument,
    selection?: Selection,
    historyStackSize?: number,
  ): Value {
    return new Value(
      schema,
      createDocument(document, schema),
      selection,
      undefined,
      historyStackSize,
    )
  }

  constructor(
    schema: Schema,
    document: ImmutableDocument,
    selection?: Selection,
    history: HistoryType = [],
    historyStackSize: number = 20,
  ) {
    this.schema = schema
    this.document = document
    this.selection = selection
    this.history = history
    this.historyStackSize = historyStackSize
  }

  get = (layerPath: string): ImmutableLayerType => {
    return (this.document.getIn(
      layerPathToKeyPath(layerPath),
    ) as any) as ImmutableLayerType
  }

  change = (fn: ChangeHandler): Value => {
    const { schema, historyStackSize } = this
    const change = new Change(this)
    fn(change)

    const history =
      change.history.length >= historyStackSize
        ? change.history
        : this.history.concat(change.history)

    return new Value(
      schema,
      change.document,
      change.selection,
      history.slice(
        Math.max(0, history.length - historyStackSize),
        history.length,
      ),
      historyStackSize,
    )
  }
}
