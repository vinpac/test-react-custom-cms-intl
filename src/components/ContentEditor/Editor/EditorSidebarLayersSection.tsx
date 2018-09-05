import * as React from 'react'
import styled from 'styled-components'
import EditorSidebarSection from '~/components/ContentEditor/Editor/EditorSidebarSection'
import LayersList from '~/components/ContentEditor/Editor/LayersList'
import Value from '~/components/ContentEditor/models/Value'

const Body = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding-bottom: 4rem;
  background: repeating-linear-gradient(
    to bottom,
    #111012,
    #111012 36px,
    #141215 36px,
    #141215 72px
  );
`

// const Footer = styled.div`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   padding: 8px;
//   background: linear-gradient(0deg, #141215, rgba(0, 0, 0, 0));
// `

interface EditorSidebarLayersSectionProps {
  readonly dispatchChange: (value: Value) => void
  readonly style: React.CSSProperties
  readonly className?: string
  readonly value: Value
}

class EditorSidebarLayersSection extends React.Component<
  EditorSidebarLayersSectionProps
> {
  static defaultProps = {
    className: undefined,
  }

  handleLayerFocus = (layerPath: string): void => {
    const { value, dispatchChange } = this.props
    if (!value.selection || value.selection.layerPath !== layerPath) {
      dispatchChange(value.change(change => change.select(layerPath)))
    }
  }

  handleLayerCollapseChange = (layerPath: string, collapsed: boolean): void => {
    const { value, dispatchChange } = this.props

    dispatchChange(
      value.change(change => {
        change.setCollapsed(layerPath, collapsed)

        // Select the collapsed layer if one of its children is the selected
        if (
          value.selection &&
          value.selection.layerPath.startsWith(layerPath)
        ) {
          change.select(layerPath)
        }

        return change
      }),
    )
  }

  handleLayerRename = (layerPath: string, input: string): void => {
    const { value, dispatchChange } = this.props

    dispatchChange(value.change(change => change.rename(layerPath, input)))
  }

  haandleLayerAction = (action: string, layerPath: string) => {
    const { value, dispatchChange } = this.props

    switch (action) {
      case 'DUPLICATE':
        dispatchChange(
          value.change(change => change.duplicate(layerPath, layerPath)),
        )
        break
      case 'DELETE':
        dispatchChange(value.change(change => change.delete(layerPath)))
        break
    }
  }

  render() {
    const { value, className, style } = this.props

    return (
      <EditorSidebarSection title="Layers" className={className} style={style}>
        <Body>
          <LayersList
            onLayerFocus={this.handleLayerFocus}
            onLayerRename={this.handleLayerRename}
            onLayerCollapseChange={this.handleLayerCollapseChange}
            onLayerAction={this.haandleLayerAction}
            value={value}
          />
        </Body>
        {/*

        <Footer>
          <Button className="btn--block">
            <Icon name="add" iconSet="material" className="mr-1" />
            Add new layer
          </Button>
        </Footer>
        */}
      </EditorSidebarSection>
    )
  }
}

export default EditorSidebarLayersSection
