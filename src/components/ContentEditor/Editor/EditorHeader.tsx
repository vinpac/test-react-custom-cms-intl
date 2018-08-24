import * as React from 'react'
import styled from 'styled-components'
import Icon from '~/components/Icon'

const Container = styled.div`
  display: flex;
  flex-direction: row;

  .btn-group {
    .btn {
      border-right: 1px solid #1c1a1d;
    }

    .btn:last-child {
      border-right-width: 0;
    }
  }
`

interface ButtonProps {
  text?: boolean
}

const Button = styled.button.attrs<ButtonProps>({
  className: 'btn btn-size-small',
})`
  background: #333133;
  font-size: 18px;
  height: 30px;
  padding: 4px 8px;
  font-weight: normal;
  color: #fff;
  border-radius: 4px;
  border-width: 0;

  &:hover {
    background: #484848;
  }

  &:active {
    background: #4e4e4e;
  }

  ${props =>
    props.text
      ? `
    font-size: 13px;
  `
      : ''};
`

interface EditorHeaderProps {
  readonly className?: string
  readonly onOpenLayerLibrary: () => void
  readonly onRefresh: () => void
  readonly onHistoryBack: () => void
  readonly onHistoryForward: () => void
}

class EditorHeader extends React.Component<EditorHeaderProps> {
  static defaultProps = {
    className: undefined,
  }
  render() {
    const {
      onOpenLayerLibrary,
      onHistoryBack,
      onHistoryForward,
      onRefresh,
      className,
    } = this.props

    return (
      <Container className={className}>
        <Button onClick={onOpenLayerLibrary} className="mr-2">
          <Icon name="add" iconSet="material" />
        </Button>
        <div className="btn-group mr-2">
          <Button onClick={onHistoryBack}>
            <Icon name="undo" iconSet="material" />
          </Button>
          <Button onClick={onHistoryForward}>
            <Icon name="redo" iconSet="material" />
          </Button>
        </div>
        <div className="mr-auto" />
        <div className="btn-group">
          <Button onClick={onHistoryBack}>
            <Icon name="chevron_left" iconSet="material" />
          </Button>
          <Button onClick={onHistoryForward}>
            <Icon name="chevron_right" iconSet="material" />
          </Button>
        </div>
        <Button className="ml-2" onClick={onRefresh}>
          <Icon name="refresh" iconSet="material" />
        </Button>
      </Container>
    )
  }
}

export default EditorHeader
