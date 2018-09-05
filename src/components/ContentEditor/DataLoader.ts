import { RenderableDocument, Node } from '~/components/ContentEditor/types'
import Schema from '~/components/ContentEditor/models/Schema'

type ResolvedNodeData = { nodeId: string; payload: any }

function generatePromises(
  nodes: Node[],
  schema: Schema,
): Array<Promise<ResolvedNodeData> | ResolvedNodeData> {
  const promises: Array<Promise<ResolvedNodeData> | ResolvedNodeData> = []

  nodes.forEach(node => {
    if (typeof node === 'string') {
      return
    }

    const type = schema.getComponent(node.kind)

    if (type && type.getInitialProps) {
      const payload = type.getInitialProps({ query: node.props || {} })
      if (payload instanceof Promise) {
        // Payload is a promise that will resolve into initial props
        promises.push(
          payload.then(props => ({ nodeId: node.id, payload: props })),
        )
      } else {
        // Payload is initial props
        promises.push({ nodeId: node.id, payload })
      }
    }

    if (node.nodes) {
      promises.push(...generatePromises(node.nodes, schema))
    }
  })

  return promises
}

export async function loadData(document: RenderableDocument, schema: Schema) {
  const mapList = await Promise.all(generatePromises(document.nodes, schema))
  const dataMap = {}

  mapList.forEach(ref => {
    dataMap[ref.nodeId] = ref.payload
  })

  return dataMap
}
