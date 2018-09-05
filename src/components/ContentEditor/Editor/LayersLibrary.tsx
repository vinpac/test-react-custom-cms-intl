import * as React from 'react'
import styled from 'styled-components'
import Icon from '~/components/Icon'
import { IconProps } from '~/components/Icon/Icon'
import Value from '~/components/ContentEditor/models/Value'
import { ImmutableLayerType } from '~/components/ContentEditor/models/Document'
import { layerPathToKeyPath } from '~/components/ContentEditor/models/utils'

const Container = styled.div`
  border-radius: 4px;
  position: absolute;
  left: 324px;
  top: 46px;
  bottom: 0;
  width: 540px;
  height: 310px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  z-index: 20;
  flex-direction: column;
`

const InputIcon = styled<IconProps>(Icon)`
  position: absolute;
  left: 10px;
  top: 6px;
  font-size: 22px;
  color: #989595;
`

const Input = styled.input.attrs({ className: 'input' })`
  height: 44px;
  min-height: 44px;
  border-width: 0;
  background: #272625;
  padding-left: 40px;
  border-radius: 4px 4px 0 0;
  color: #fff;
  font-size: 18px;

  &,
  &:hover,
  &:focus {
    border-bottom: 1px solid #525252;
  }

  &:focus + ${InputIcon} {
    color: #fff;
  }

  &::placeholder {
    color: #989595;
  }
`

const Body = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  position: relative;
`

const List = styled.div`
  background: rgba(40, 40, 40, 0.95);
  border-bottom-left-radius: 4px;
  border-right: 1px solid #525252;
  margin: 0;
  padding: 0;
  list-style: none;
  padding: 5px 0;
  overflow-y: auto;
  position: absolute;
  width: 186px;
  left: 0;
  top: 0;
  bottom: 0;

  > li {
    display: block;
    width: 100%;
  }
`

const ListSectionTitle = styled.h4`
  font-size: 13px;
  color: #b7b7b7;
  font-weight: 500;
  padding: 8px;
  margin: 0;
`

interface ListOptionProps {
  readonly active: boolean
}
const ListOption = styled<ListOptionProps, 'button'>('button')`
  border: 0;
  color: #fff;
  display: block;
  width: 100%;
  text-align: left;
  padding: 5px 18px;
  font-size: 13px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  ${props =>
    props.active
      ? `
    &,
    &:hover {
      background: #2F98F9;
    }

    &:focus {
      box-shadow: inset 2px 0 #fff;
    }
  `
      : `
    background: none;

    &:hover {
      background: rgba(255, 255, 255, 0.05)
    }

    &:focus {
      box-shadow: inset 2px 0 #2F98F9;
    }
  `};
`

const Info = styled.div`
  background: #272625;
  border-bottom-right-radius: 4px;
  flex: 1 1 auto;
  padding: 1rem;
  position: absolute;
  left: 186px;
  top: 0;
  right: 0;
  bottom: 0;
`

const InfoFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 10px;
  border-top: 1px solid #525252;
  display: flex;
  flex-direction: row;
`

const ComponentName = styled.h4`
  color: #fff;
  font-weight: normal;
  diplay: block;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  font-size: 20px;
`

const ComponentDescription = styled.p`
  color: #ccc;
  margin: 0;
  font-size: 14px;
`

const Breadcrumbs = styled.ul`
  font-size: 12px;
  color: #999;
  border-radius: 4px;
  border: 1px solid #999;
  list-style: none;
  padding: 0;
  margin: 0;
  display: inline-block;
  padding: 0 4px;
  white-space: nowrap;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  text-overflow: ellipsis;
  overflow: hidden;

  li {
    display: inline-block;
    padding: 1px 2px;

    &::after {
      content: '>';
      margin-left: 4px;
    }

    &:last-child::after {
      content: '';
      display: none;
    }
  }
`

const BreadcrumbsWrapper = styled.div`
  flex: 1 1 auto;
  position: relative;
`

const SubmitButton = styled.button`
  background: #555;
  font-size: 12px;
  padding: 4px 8px;
  color: #fff;
`

export interface LayersLibraryProps {
  readonly className?: string
  readonly editorValue: Value
}

interface LibrarySelection {
  kind: 'TYPE' | 'PLAIN_TYPE'
  key: string
}

interface LayersLibraryOptions {
  types: string[]
}

interface LayersLibraryState {
  isOpen: boolean
  selection?: LibrarySelection
  inputValue: string
  options: LayersLibraryOptions
}

class LayersLibrary extends React.PureComponent<
  LayersLibraryProps,
  LayersLibraryState
> {
  input: HTMLInputElement | null

  static defaultProps = {
    className: undefined,
  }

  static getDerivedStateFromProps(
    props: LayersLibraryProps,
    state: LayersLibraryState | null,
  ): LayersLibraryState {
    const {
      editorValue: { selection, document, schema },
    } = props
    const options: LayersLibraryOptions = { types: [] }

    if (state && state.inputValue) {
      const regex = new RegExp(state.inputValue, 'gi')
      options.types.push(
        ...schema.getComponentKinds().filter(key => regex.test(key)),
      )
    } else {
      options.types.push(...schema.getComponentKinds())
    }

    const parentKind: string = selection
      ? ((document.getIn(
          layerPathToKeyPath(selection.layerPath),
        ) as any) as ImmutableLayerType).get('kind')
      : 'Document'
    const parentComponent =
      parentKind && schema.getComponent(parentKind)
        ? schema.getComponent(parentKind)
        : null

    options.types = options.types.filter(key => {
      const def = schema.getComponent(key)

      if (
        parentComponent &&
        parentComponent.filterChildren &&
        !parentComponent.filterChildren(key)
      ) {
        return false
      }

      if (def && def.filterParent) {
        return def.filterParent(parentKind, parentComponent || null)
      }

      return true
    })

    return {
      isOpen: state ? state.isOpen : false,
      inputValue: state ? state.inputValue : '',
      selection:
        state && state.selection && options.types.includes(state.selection.key)
          ? state.selection
          : options && options.types
            ? { kind: 'TYPE', key: options.types[0] }
            : undefined,
      options,
    }
  }

  constructor(props) {
    super(props)

    this.state = LayersLibrary.getDerivedStateFromProps(props, null)
  }

  handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: target.value })
  }

  open = () => {
    this.setState({ isOpen: true }, () => {
      if (this.input) {
        this.input.focus()
      }
    })
  }

  handleInputKeyDown = ({ keyCode }: React.KeyboardEvent<HTMLInputElement>) => {
    const { selection, options } = this.state
    if (options.types.length > 0) {
      if (keyCode === 40) {
        const index = selection ? options.types.indexOf(selection.key) : 0
        this.setState({
          selection: {
            kind: 'TYPE',
            key:
              options.types[
                Math.min(
                  index === options.types.length - 1 ? 0 : index + 1,
                  options.types.length - 1,
                )
              ],
          },
        })
      } else if (keyCode === 38) {
        const index = selection
          ? options.types.indexOf(selection.key)
          : options.types.length - 1
        this.setState({
          selection: {
            kind: 'TYPE',
            key:
              options.types[
                Math.max(index === 0 ? options.types.length - 1 : index - 1, 0)
              ],
          },
        })
      }
    }
  }

  select = (key: string, kind: 'TYPE') => {
    this.setState({ selection: { key, kind } })
  }

  renderBreadcrumbs = () => {
    const { editorValue } = this.props
    const breadcrumbs: string[] = []

    if (!editorValue.selection) {
      return null
    }

    const {
      selection: { layerPath: selectedLayerPath },
    } = editorValue
    let parent: ImmutableLayerType

    selectedLayerPath.split('.').forEach((childIndex, i) => {
      parent =
        i === 0
          ? editorValue.document.get('nodes').get(parseInt(childIndex, 10))
          : parent.get('nodes').get(parseInt(childIndex, 10))
      breadcrumbs.push(parent.get('name'))
    })

    return (
      <Breadcrumbs>
        {breadcrumbs.map((item, i) => (
          <li key={`${item}${i}`}>{item}</li>
        ))}
      </Breadcrumbs>
    )
  }

  render() {
    const {
      className,
      editorValue: { schema },
    } = this.props
    const { isOpen, selection, options, inputValue } = this.state
    const selectedComponent = selection
      ? schema.getComponent(selection.key)
      : null

    return (
      <Container
        className={className}
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <Input
          ref={ref => {
            this.input = ref
          }}
          placeholder="Search layers"
          spellCheck={false}
          value={inputValue}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyDown}
        />
        <InputIcon name="search" iconSet="material" />
        <Body>
          <List>
            {options && options.types.length ? (
              <>
                <ListSectionTitle>Components</ListSectionTitle>
                {options.types.map(key => (
                  <li key={key}>
                    <ListOption
                      active={
                        selection && selection.kind === 'TYPE'
                          ? selection.key === key
                          : false
                      }
                      onClick={() => this.select(key, 'TYPE')}
                    >
                      {key}
                    </ListOption>
                  </li>
                ))}{' '}
              </>
            ) : (
              <>
                <ListSectionTitle>Sem resultados</ListSectionTitle>
              </>
            )}
          </List>
          {selection && selectedComponent ? (
            <Info>
              <ComponentName>
                {selectedComponent.name || selection.key}
              </ComponentName>
              <ComponentDescription>
                {selectedComponent.description}
              </ComponentDescription>
              <InfoFooter>
                <BreadcrumbsWrapper>
                  {this.renderBreadcrumbs()}
                </BreadcrumbsWrapper>
                <SubmitButton className="btn ml-2">Add Layer</SubmitButton>
              </InfoFooter>
            </Info>
          ) : (
            <Info className="tc-white ts-small">¯\_(ツ)_/¯</Info>
          )}
        </Body>
      </Container>
    )
  }
}

export default LayersLibrary
