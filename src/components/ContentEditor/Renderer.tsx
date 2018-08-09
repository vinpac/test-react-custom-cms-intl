import * as React from 'react'
import {
  RendereableCMSDocument,
  Schema,
  WeakLayerNodeType,
} from '~/components/ContentEditor/types'

const renderLayer = (
  node: WeakLayerNodeType,
  schema: Schema,
): React.ReactElement<any> | null | string => {
  if (typeof node === 'string') {
    return node
  }

  if (node.disabled) {
    return null
  }

  const Component = schema.plainTypes.includes(node.kind)
    ? node.kind
    : schema.types[node.kind]

  if (!Component) {
    throw new Error(
      `'${
        node.kind
      }' is not a valid component type or plain type. Failed to render document.`,
    )
  }

  let props: object = node.props || {}

  if (node.modifiers) {
    node.modifiers.forEach(modifier => {
      if (schema.modifiers && schema.modifiers[modifier.kind]) {
        props = schema.modifiers![modifier.kind](props, modifier.value, {
          schema,
        })
      } else {
        throw new Error(
          `'${
            modifier.kind
          }' is not a valid modifier. You may have forgotten to include it in the schema. Failed to render document.`,
        )
      }
    })
  }

  return (
    <Component key={node.id} {...props}>
      {node.nodes &&
        node.nodes.map(childNode => renderLayer(childNode, schema))}
    </Component>
  )
}

interface RendererProps {
  document: RendereableCMSDocument
  schema: Schema
}

const Renderer: React.SFC<RendererProps> = ({
  document: { nodes },
  schema,
}) => {
  return <>{nodes.map(node => renderLayer(node, schema))}</>
}

export default Renderer
