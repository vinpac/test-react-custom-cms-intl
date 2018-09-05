import * as React from 'react'
import EditorSidebarSection from '~/components/ContentEditor/Editor/EditorSidebarSection'
import Value from '~/components/ContentEditor/models/Value'
import { ImmutableLayerType } from '~/components/ContentEditor/models/Document'
import PropertiesForm from '~/components/ContentEditor/Editor/PropertiesForm'
import { Map } from 'immutable'

interface EditorSidebarLayerPropertiesSectionProps {
  readonly dispatchChange: (value: Value) => void
  readonly style: React.CSSProperties
  readonly className?: string
  readonly value: Value
}

interface EditorSidebarLayerPropertiesSectionState {}

class EditorSidebarLayerPropertiesSection extends React.Component<
  EditorSidebarLayerPropertiesSectionProps,
  EditorSidebarLayerPropertiesSectionState
> {
  static defaultProps = {
    className: undefined,
  }

  setLayerProps = (layerPath: string, nextProps) => {
    const { dispatchChange, value } = this.props

    dispatchChange(
      value.change(change => change.setProps(layerPath, nextProps)),
    )
  }

  render() {
    const { className, style, value: editorValue } = this.props
    const { selection } = editorValue
    const selectedLayer: ImmutableLayerType | undefined =
      selection && editorValue.get(selection.layerPath)
    const component =
      selectedLayer &&
      editorValue.schema.getComponent(selectedLayer.get('kind'))

    return (
      <EditorSidebarSection
        title={selectedLayer ? selectedLayer.get('kind') : 'Propriedades'}
        className={className}
        style={style}
      >
        {component &&
          component.propertyControls && (
            <PropertiesForm
              key={selectedLayer!.get('id')}
              schema={editorValue.schema}
              controls={component.propertyControls}
              value={(selectedLayer!.get('props') as Map<any, any>).toJS()}
              onChange={nextProps =>
                selection
                  ? this.setLayerProps(selection.layerPath, nextProps)
                  : undefined
              }
            />
          )}
      </EditorSidebarSection>
    )
  }
}

export default EditorSidebarLayerPropertiesSection
