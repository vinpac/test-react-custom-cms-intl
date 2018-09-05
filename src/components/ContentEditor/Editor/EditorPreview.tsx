import * as React from 'react'
import styled from 'styled-components'
import Value from '~/components/ContentEditor/models/Value'

const Preview = styled.div`
  position: relative;
  border-radius: 4px;
  background: #fff;
  flex: 1 1 auto;
  overflow: hidden;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
`

const Frame = styled.iframe`
  border: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

interface EditorPreviewProps {
  readonly className?: string
  readonly value: Value
}

interface EditorPreviewState {
  iframeKey: number
}

class EditorPreview extends React.PureComponent<
  EditorPreviewProps,
  EditorPreviewState
> {
  iframe: HTMLIFrameElement | null

  static defaultProps = {
    className: undefined,
  }

  state = { iframeKey: 1 }

  componentDidMount() {
    localStorage.setItem(
      'rr-json',
      JSON.stringify(this.props.value.document.toJS()),
    )
  }

  componentDidUpdate(prevProps: EditorPreviewProps) {
    if (prevProps.value !== this.props.value) {
      localStorage.setItem(
        'rr-json',
        JSON.stringify(this.props.value.document.toJS()),
      )
    }
  }

  refresh = () => {
    this.setState({ iframeKey: this.state.iframeKey + 1 })
  }

  historyBack = () => {
    const { iframe } = this

    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.history.back()
    }
  }

  historyForward = () => {
    const { iframe } = this

    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.history.forward()
    }
  }

  render() {
    const { className } = this.props
    const { iframeKey } = this.state

    return (
      <Preview className={className}>
        <Frame
          key={iframeKey}
          innerRef={(iframe: HTMLIFrameElement | null) => {
            this.iframe = iframe
          }}
          src="/render"
          frameBorder="0"
        />
      </Preview>
    )
  }
}

export default EditorPreview
