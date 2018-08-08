import * as React from 'react'
import {
  RendereableCMSDocument,
  Schema,
  WeakLayerNode,
} from '~/components/ContentEditor/types'

interface RenderLayerProps {
  schema: Schema
  node: WeakLayerNode
}

const RenderLayer: React.SFC<RenderLayerProps> = ({ schema, node }) => {
  if (node.disabled) {
    return null
  }

  const Component = schema.plainTypes.includes(node.kind)
    ? node.kind
    : schema.types[node.kind]

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
          }' is not a valid modifier. You may have forgotten to include it in the schema.`,
        )
      }
    })
  }

  return (
    <Component {...props}>
      {node.nodes &&
        node.nodes.map((childNode, i) => (
          <RenderLayer key={i} node={childNode} schema={schema} />
        ))}
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
  return (
    <>
      {nodes.map(node => (
        <RenderLayer key={node.id} schema={schema} node={node} />
      ))}
    </>
  )
}

export default Renderer
