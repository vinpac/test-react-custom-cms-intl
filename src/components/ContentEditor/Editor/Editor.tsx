import * as React from 'react'
import styled from 'styled-components'
import EditorSidebar, {
  EditorSidebarProps,
} from '~/components/ContentEditor/Editor/EditorSidebar'
import EditorHeader from '~/components/ContentEditor/Editor/EditorHeader'
import EditorPreview from '~/components/ContentEditor/Editor/EditorPreview'
import Value from '~/components/ContentEditor/models/Value'
import schema from '~/components/ContentEditor/schema'
import LayersLibrary from '~/components/ContentEditor/Editor/LayersLibrary'
import Schema from '~/components/ContentEditor/models/Schema'
import { RenderableDocument } from '~/components/ContentEditor/types'

const Container = styled.div`
  background: #1c1a1d;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Body = styled.div`
  padding: 0.5rem 1rem 1rem 1rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 309px;
  right: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`

const Sidebar = styled<EditorSidebarProps>(EditorSidebar)`
  width: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 309px;
`

interface EditorProps {
  readonly className?: string
  readonly schema: Schema
  readonly defaultValue: RenderableDocument
}

interface EditorState {
  value: Value
}

class Editor extends React.Component<EditorProps, EditorState> {
  layersLibrary: LayersLibrary | null
  preview: EditorPreview | null
  interval: number

  static defaultProps = {
    className: undefined,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: Value.fromJS(schema, props.defaultValue),
    }
  }

  componentDidMount() {
    // this.interval = window.setInterval(() => {
    //   const { value } = this.state
    //   this.setState({
    //     value: value.change(change => {
    //       return change.addLayer(createLayer('a'), '2.0')
    //     }),
    //   })
    // }, 5000)
  }

  componentWillUnmount() {
    clearTimeout(this.interval)
  }

  refreshPreview = () => {
    if (this.preview) {
      this.preview.refresh()
    }
  }

  forwardPreviewHistory = () => {
    if (this.preview) {
      this.preview.historyForward()
    }
  }

  backPreviewHistory = () => {
    if (this.preview) {
      this.preview.historyBack()
    }
  }

  handleLayerLibraryRequest = () => {
    if (this.layersLibrary) {
      this.layersLibrary.open()
    }
  }

  handleValueChange = (value: Value) => this.setState({ value })

  render() {
    const { className } = this.props
    const { value } = this.state

    return (
      <Container className={className}>
        <LayersLibrary
          ref={ref => {
            this.layersLibrary = ref
          }}
          editorValue={value}
        />
        <Body>
          <EditorHeader
            onRefresh={this.refreshPreview}
            onOpenLayerLibrary={this.handleLayerLibraryRequest}
            onHistoryBack={this.backPreviewHistory}
            onHistoryForward={this.forwardPreviewHistory}
            className="mb-2"
          />
          <EditorPreview
            ref={preview => {
              this.preview = preview
            }}
            value={value}
          />
        </Body>
        <Sidebar value={value} dispatchChange={this.handleValueChange} />
      </Container>
    )
  }
}

export default Editor
