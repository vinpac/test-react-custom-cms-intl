import * as React from 'react'
import styled from 'styled-components'
import Value from '~/components/ContentEditor/models/Value'
import Layer from '~/components/ContentEditor/Editor/Layer'

const Container = styled.div`
  background: repeating-linear-gradient(
    to bottom,
    #111012,
    #111012 36px,
    #141215 36px,
    #141215 72px
  );
  overflow: hidden;
`

export interface LayersListProps {
  readonly className?: string
  readonly value: Value
  readonly onLayerRename?: (layerPath: string, input: string) => void
  readonly onLayerFocus?: (layerPath: string) => void
  readonly onLayerAction?: (action: string, layerPath: string) => void
  readonly onLayerCollapseChange?: (
    layerPath: string,
    collapsed: boolean,
  ) => void
}

const LayersList: React.SFC<LayersListProps> = ({
  onLayerFocus,
  onLayerAction,
  onLayerCollapseChange,
  onLayerRename,
  value,
  className,
}) => (
  <Container className={className}>
    {value.document
      .get('nodes')
      .map(
        (layer, i) =>
          layer && (
            <Layer
              key={layer.get('id')}
              editorValue={value}
              kind={layer.get('kind')}
              name={layer.get('name')}
              collapsed={layer.get('collapsed')}
              disabled={layer.get('disabled')}
              nodes={layer.get('nodes')}
              depth={0}
              path={String(i)}
              onFocus={onLayerFocus}
              onAction={onLayerAction}
              onCollapseChange={onLayerCollapseChange}
              onRename={onLayerRename}
            />
          ),
      )}
  </Container>
)

LayersList.displayName = 'LayersList'
LayersList.defaultProps = {
  className: undefined,
}

export default LayersList
