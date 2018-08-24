import Value, { Selection } from './Value'
import { HistoryType } from '~/components/ContentEditor/models/History'
import {
  ImmutableDocument,
  ImmutableLayerType,
} from '~/components/ContentEditor/models/Document'
import { LayerType } from '~/components/ContentEditor/types'
import { fromJS } from 'immutable'
import { layerPathToKeyPath } from '~/components/ContentEditor/models/utils'
import { generateRandomId } from '~/components/ContentEditor/Editor/utils'

export default class Change {
  document: ImmutableDocument
  history: HistoryType
  selection?: Selection
  initialValue: Value

  constructor(value: Value) {
    this.initialValue = value
    this.document = this.initialValue.document
    this.selection = this.initialValue.selection
    this.history = []
  }

  blur = (): Change => {
    this.selection = undefined

    return this
  }

  select = (layerPath: string): Change => {
    this.selection = { layerPath }
    this.history.push({
      type: 'LAYER_SELECT',
      payload: { layerPath },
    })

    return this
  }

  setCollapsed = (layerPath: string, collapsed: boolean): Change => {
    const keyPath = layerPathToKeyPath(layerPath)
    keyPath.push('collapsed')
    this.document = this.document.setIn(keyPath, collapsed)
    this.history.push({
      type: 'LAYER_SET_COLLAPSED',
      payload: {
        target: layerPath,
        collapsed,
      },
    })

    return this
  }

  addLayer = (layer: LayerType, layerTargetPath: string): Change => {
    const keyPath = layerPathToKeyPath(layerTargetPath)
    const index: number = parseInt(keyPath.pop()!, 10)

    this.document = this.document.setIn(
      keyPath,
      this.document
        .getIn(keyPath)
        .insert(index, fromJS(layer) as ImmutableLayerType),
    )
    this.history.push({
      type: 'LAYER_ADD',
      payload: {
        target: layerTargetPath,
      },
    })

    return this
  }

  setProps = (layerPath: string, nextProps: object): Change => {
    const keyPath = layerPathToKeyPath(layerPath)
    keyPath.push('props')
    this.document = this.document.setIn(keyPath, fromJS(nextProps))
    this.history.push({
      type: 'LAYER_CHANGE_PROPS',
      payload: {
        layerPath,
        nextProps,
      },
    })
    return this
  }

  setProp = (layerPath: string, propertyKey: string, input: any): Change => {
    const keyPath = layerPathToKeyPath(layerPath)
    keyPath.push('props', propertyKey)
    this.document = this.document.setIn(keyPath, input)
    this.history.push({
      type: 'LAYER_CHANGE_PROP',
      payload: {
        layerPath,
        propertyKey,
        input,
      },
    })
    return this
  }

  rename = (layerPath: string, input: string): Change => {
    const keyPath = layerPathToKeyPath(layerPath)
    keyPath.push('name')
    this.document = this.document.setIn(keyPath, input)
    this.history.push({
      type: 'LAYER_RENAME',
      payload: {
        oldValue: (this.document.getIn(keyPath) as any) as string,
        layerPath,
        input,
      },
    })
    return this
  }

  duplicate = (sourcePath: string, targetPath: string): Change => {
    const sourceKeyPath = layerPathToKeyPath(sourcePath)
    const targetNodesKeyPath = layerPathToKeyPath(targetPath)
    const targetIndex = parseInt(targetNodesKeyPath.pop()!, 10)

    this.history.push({
      type: 'LAYER_DUPLICATE',
      payload: {
        sourcePath,
        targetPath,
      },
    })

    const layer = (this.document.getIn(
      sourceKeyPath,
    ) as any) as ImmutableLayerType
    this.document = this.document.setIn(
      targetNodesKeyPath,
      this.document
        .getIn(targetNodesKeyPath)
        .insert(targetIndex, layer.set(
          'id',
          generateRandomId(),
        ) as ImmutableLayerType),
    )

    return this
  }

  delete = (layerPath: string): Change => {
    const keyPath = layerPathToKeyPath(layerPath)
    this.document = this.document.deleteIn(keyPath)
    this.history.push({
      type: 'LAYER_DELETE',
      payload: {
        target: layerPath,
      },
    })

    const index = parseInt(keyPath.pop()!, 10)
    const parentList = this.document.getIn(keyPath)
    const splitedPath = layerPath.split('.')

    if (parentList.size > 0) {
      splitedPath[splitedPath.length - 1] = String(
        Math.max(0, Math.min(parentList.size - 1, index)),
      )
      return this.select(splitedPath.join('.'))
    }

    splitedPath.splice(splitedPath.length - 1, 1)
    if (splitedPath.length === 0) {
      return this.blur()
    }

    return this.select(splitedPath.join('.'))
  }
}
