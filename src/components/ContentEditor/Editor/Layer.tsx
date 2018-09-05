import * as React from 'react'
import styled, { css } from 'styled-components'
import { List } from 'immutable'
import { ImmutableLayerType } from '~/components/ContentEditor/models/Document'
import Value from '~/components/ContentEditor/models/Value'
import Icon from '~/components/Icon'
import { IconProps } from '~/components/Icon/Icon'
import Schema from '~/components/ContentEditor/models/Schema'

export function resolveLayerIcon(
  schema: Schema,
  kind: string,
  focused: boolean,
): string {
  const componentDef = schema.getComponent(kind)

  if (componentDef && componentDef.layerIcon) {
    return focused && componentDef.layerFocusedIcon
      ? componentDef.layerFocusedIcon
      : componentDef.layerIcon
  }

  return kind === 'Text'
    ? '/icons/text-white.svg'
    : '/icons/rectangle-white.svg'
}

interface ContainerProps {
  readonly focused: boolean
}

const Container = styled<ContainerProps, 'button'>('button')`
  height: 36px;
  color: #fff;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  border-width: 0;
  text-align: left;
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: inset -2px 0 #fff;
  }

  ${props =>
    props.focused
      ? css`
          background: #0099fe;

          ${Body} {
            border-bottom-width: 0;
          }
        `
      : `
        background: none;

        &:hover,
        &:focus {
          background: rgba(255, 255, 255, 0.02);
        }

        &:focus {
          box-shadow: inset -2px 0 #fff;
        }
      `};
`

const Body = styled.div`
  padding: 7px 12px;
  height: 100%;
  border-bottom: 1px solid #29272b;
  position: relative;
`

const CollapseIcon = styled<IconProps>(Icon)`
  background: none;
  color: #fff;
  position: absolute;
  left: -8px;
  top: 0;
  bottom: 0;
  padding: 5px 0;
  height: 36px;
  font-size: 18px;

  &:hover {
    background: none;
  }
`

const RenameForm = styled.form`
  position: absolute;
  left: 36px;
  right: 8px;
  top: 4px;
`

const Input = styled.input.attrs({ className: 'input' })`
  background: rgba(0, 0, 0, 0.2);
  border: 0;
  padding: 2px 8px;
  color: #fff;
  font-size: 14px;
  height: 28px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`

interface LayerProps {
  readonly editorValue: Value
  readonly name: string
  readonly kind: string
  readonly path: string
  readonly depth: number
  readonly collapsed?: boolean
  readonly onRename?: (layerPath: string, input: string) => void
  readonly onFocus?: (layerPath: string) => void
  readonly onAction?: (action: string, layerPath: string) => void
  readonly onCollapseChange?: (layerPath: string, collapsed: boolean) => void
  readonly disabled: boolean
  readonly nodes?: List<ImmutableLayerType>
  readonly className?: string
}

interface LayerState {
  readonly showNameInput: boolean
}

export const convertDepthToMargin = depth => (depth + 1) * 16 - 5

class Layer extends React.PureComponent<LayerProps, LayerState> {
  nameInput: HTMLInputElement | null
  container: HTMLDivElement | null

  state = {
    showNameInput: false,
  }

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { onFocus, collapsed, onCollapseChange } = this.props
    let action: string | undefined

    if (event && event.target) {
      action = (event.target as HTMLElement).dataset.action
    }

    switch (action) {
      case 'collapse':
        if (onCollapseChange) {
          onCollapseChange(this.props.path, !collapsed)
        }
        break
      default:
        if (onFocus) {
          onFocus(this.props.path)
        }
    }
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const { onAction, path } = this.props
    const { showNameInput } = this.state

    if (event.keyCode === 68 && event.metaKey && onAction) {
      event.preventDefault()
      onAction('DUPLICATE', path)
      return
    }

    if (event.keyCode === 13 && !showNameInput) {
      event.preventDefault()
      this.showRenameInput()

      return
    }

    if (event.keyCode === 8 && onAction) {
      event.preventDefault()
      onAction('DELETE', path)
    }
  }

  showRenameInput = () => {
    this.setState({ showNameInput: true }, () => {
      if (this.nameInput) {
        this.nameInput.focus()
      }
    })
  }

  submitRename = (event?: React.FormEvent<HTMLElement>): void => {
    if (event) {
      event.preventDefault()
    }

    const { onRename, path } = this.props
    const { showNameInput } = this.state
    if (showNameInput) {
      if (this.nameInput && onRename) {
        const { value } = this.nameInput
        onRename(path, value)
      }

      this.setState({ showNameInput: false }, () => {
        if (this.container) {
          this.container.focus()
        }
      })
    }
  }

  render() {
    const {
      className,
      editorValue,
      name,
      kind,
      collapsed,
      nodes,
      depth,
      path,
      onFocus,
      onAction,
      onRename,
      onCollapseChange,
    } = this.props
    const { showNameInput } = this.state
    const focused = !!(
      editorValue.selection && editorValue.selection.layerPath === path
    )

    return (
      <>
        <Container
          ref={container => {
            this.container = container
          }}
          type="button"
          className={className}
          focused={focused}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          <Body
            style={
              depth === 0
                ? { paddingLeft: `${convertDepthToMargin(depth) + 12}px` }
                : { marginLeft: `${convertDepthToMargin(depth)}px` }
            }
          >
            {nodes &&
              nodes.size > 0 && (
                <CollapseIcon
                  data-action="collapse"
                  name={collapsed ? 'arrow_right' : 'arrow_drop_down'}
                  iconSet="material"
                  style={depth === 0 ? { left: '4px' } : undefined}
                />
              )}
            <img
              src={resolveLayerIcon(editorValue.schema, kind, focused)}
              alt="."
              className="mr-2"
              width="16"
              height="16"
            />
            {showNameInput ? (
              <RenameForm onSubmit={this.submitRename}>
                <Input
                  ref={input => {
                    this.nameInput = input
                  }}
                  type="text"
                  defaultValue={name}
                  placeholder={name}
                  onBlur={this.submitRename}
                />
              </RenameForm>
            ) : (
              name
            )}
          </Body>
        </Container>
        {nodes &&
          !collapsed &&
          nodes.map(
            (layer, i) =>
              layer && (
                <Layer
                  key={layer.get('id')}
                  editorValue={editorValue}
                  name={layer.get('name')}
                  kind={layer.get('kind')}
                  collapsed={layer.get('collapsed')}
                  disabled={layer.get('disabled')}
                  nodes={layer.get('nodes')}
                  depth={depth + 1}
                  path={`${path}.${i}`}
                  onFocus={onFocus}
                  onRename={onRename}
                  onAction={onAction}
                  onCollapseChange={onCollapseChange}
                />
              ),
          )}
      </>
    )
  }
}

export default Layer
