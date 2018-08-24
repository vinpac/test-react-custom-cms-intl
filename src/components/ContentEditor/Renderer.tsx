import * as React from 'react'
import { Node, RenderableDocument } from '~/components/ContentEditor/types'
import Schema from '~/components/ContentEditor/models/Schema'

const renderLayer = (
  node: Node,
  schema: Schema,
): React.ReactElement<any> | null | string => {
  if (typeof node === 'string') {
    return node
  }

  if (node.disabled) {
    return null
  }

  const Component:
    | React.ComponentType<any>
    | string
    | undefined = schema.isValidPlainType(node.kind)
    ? node.kind
    : schema.getReactComponent(node.kind)

  if (!Component) {
    if (node.kind === 'Text' && node.props) {
      return node.props.value
    }

    throw new Error(
      `'${
        node.kind
      }' is not a valid component type or plain type. Failed to render document.`,
    )
  }

  let props: object = node.props || {}

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
    <Component key={node.id} {...props}>
      {node.nodes &&
        node.nodes.map(childNode => renderLayer(childNode, schema))}
    </Component>
  )
}

interface RendererProps {
  document: RenderableDocument
  schema: Schema
}

const Renderer: React.SFC<RendererProps> = ({
  document: { nodes },
  schema,
}) => {
  return <>{nodes.map(node => renderLayer(node, schema))}</>
}

export default Renderer
