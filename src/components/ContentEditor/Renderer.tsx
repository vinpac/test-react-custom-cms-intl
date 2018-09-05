import * as React from 'react'
import {
  Node,
  RenderableDocument,
  ComponentType,
} from '~/components/ContentEditor/types'
import Schema from '~/components/ContentEditor/models/Schema'

export type DataMap = { [nodeId: string]: object }

const renderLayer = (
  node: Node,
  schema: Schema,
  dataMap?: DataMap,
): React.ReactElement<any> | null | string => {
  if (typeof node === 'string') {
    return node
  }

  if (node.disabled) {
    return null
  }

  const Component:
    | ComponentType<any, any>
    | string
    | undefined = schema.isValidPlainType(node.kind)
    ? node.kind
    : schema.getComponent(node.kind)

  if (!Component) {
    if (node.kind === 'Text' && node.props) {
      const { style, kind } = node.props
      if (kind) {
        return (
          <node.props.kind key={node.id} style={style}>
            {node.props.value}
          </node.props.kind>
        )
      }

      return node.props.value
    }

    throw new Error(
      `'${
        node.kind
      }' is not a valid component type or plain type. Failed to render document.`,
    )
  }

  let props: object = node.props || {}

  if (dataMap && dataMap[node.id]) {
    Object.assign(props, dataMap[node.id])
  }

  if (node.modifiers) {
    node.modifiers.forEach(modifierDefinition => {
      const modifier = schema.getModifier(modifierDefinition.kind)
      if (modifier) {
        props = modifier(props, modifierDefinition.value, { schema })
      } else {
        throw new Error(
          `'${
            modifierDefinition.kind
          }' is not a valid modifier. You may have forgotten to include it in the schema. Failed to render document.`,
        )
      }
    })
  }

  return (
    // @ts-ignore
    <Component key={node.id} {...props}>
      {node.nodes &&
        node.nodes.map(childNode => renderLayer(childNode, schema))}
    </Component>
  )
}

interface RendererProps {
  loadedData?: DataMap
  document: RenderableDocument
  schema: Schema
}

const Renderer: React.SFC<RendererProps> = ({
  document: { nodes },
  schema,
  loadedData,
}) => {
  return <>{nodes.map(node => renderLayer(node, schema, loadedData))}</>
}

export default Renderer
