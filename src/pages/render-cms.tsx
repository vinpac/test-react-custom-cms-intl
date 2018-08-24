import * as React from 'react'
import { Renderer } from '~/components/ContentEditor'
import schema from '~/components/ContentEditor/schema'
import { RenderableDocument } from '~/components/ContentEditor/types'

interface RenderCMSProps {
  readonly className?: string
}

interface RenderCMSState {
  json: RenderableDocument
}

class RenderCMS extends React.Component<RenderCMSProps, RenderCMSState> {
  cachedJSON: string | null

  static defaultProps = {
    className: undefined,
  }

  state = { json: { nodes: [], schema } }

  componentDidMount() {
    const json = localStorage.getItem('rr-json')
    this.cachedJSON = json

    window.addEventListener('storage', this.handleStorageChange)

    if (json) {
      this.setState({
        json: JSON.parse(json),
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.handleStorageChange)
  }

  handleStorageChange = () => {
    const json = localStorage.getItem('rr-json')

    if (json !== this.cachedJSON) {
      this.cachedJSON = json
      if (json) {
        this.setState({
          json: JSON.parse(json),
        })
      }
    }
  }

  render() {
    const { json } = this.state

    return <Renderer schema={schema} document={json} />
  }
}

export default RenderCMS
