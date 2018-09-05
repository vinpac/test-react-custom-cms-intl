import { fromJS, List } from 'immutable'
import {
  Layer,
  Document,
  LayerType,
  Node,
  RenderableDocument,
} from '~/components/ContentEditor/types'
import Schema from '~/components/ContentEditor/models/Schema'
import { generateRandomId } from '~/components/ContentEditor/Editor/utils'

interface ImmutableMap<T, R = T> {
  get<K extends keyof T>(name: K): T[K]
  set(key: string, value: any): ImmutableMap<T, R>
  setIn(keyPath: string[], value: any): ImmutableMap<T, R>
  getIn<K extends keyof T>(keyPath: string[]): T[K]
  deleteIn(keyPath: string[]): ImmutableMap<T, R>
  toJS(): R
}

interface ImmutableLayer
  extends ImmutableMap<
      Layer & {
        nodes: List<ImmutableLayerType>
        props: Map<any, any>
      }
    > {
  nodes: List<ImmutableLayerType>
  props: Map<any, any>
}

export type ImmutableLayerType = ImmutableLayer

export type ImmutableDocument = ImmutableMap<
  {
    nodes: List<ImmutableLayerType>
  },
  Document
>

export function createLayer(node: Node, schema: Schema): LayerType {
  if (typeof node === 'string') {
    return {
      id: generateRandomId(),
      name: node,
      kind: 'Text',
      disabled: false,
      modifiers: [],
      props: {
        value: node,
      },
    }
  }

  const component = schema.getComponentDescription(node.kind)

  return {
    id: node.id || generateRandomId(),
    name: node.name || node.kind,
    kind: node.kind,
    disabled: typeof node.disabled === 'undefined' ? false : node.disabled,
    modifiers: node.modifiers || [],
    props: component
      ? { ...component.defaultProps, ...node.props }
      : node.props || {},
    nodes: node.nodes
      ? node.nodes.map(node => createLayer(node, schema))
      : undefined,
  }
}

export const DocumentKind = '@@framer/Document'
export function createDocument(
  { nodes }: RenderableDocument,
  schema: Schema,
): ImmutableDocument {
  return fromJS({ nodes: nodes.map(node => createLayer(node, schema)) })
}
