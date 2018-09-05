import * as React from 'react'
import styled from 'styled-components'
import { defineMessages, InjectedIntlProps } from 'react-intl'
import { withIntl } from '~/lib/intl'
import Icon from '~/components/Icon'
import Dropdown, { DropdownMenu } from '~/components/Dropdown'
import { DropdownProps } from '~/components/Dropdown/Dropdown'

interface Option<Node> {
  id: string
  type: string
  label: string
  value: Node
}

interface AddressNode {
  id: string
  description: string
  address_components: Array<{
    description: string
    types: string[]
    long_name: string
  }>
}

interface AddressOption extends Option<AddressNode> {
  type: 'address'
}

interface QueryOption extends Option<string> {
  type: 'query'
}

interface CauseOption extends Option<string> {
  type: 'cause'
}

type SearchOption = AddressOption | QueryOption | CauseOption

const DropdownInputWrapper = styled<DropdownProps>(Dropdown)`
  width: 100%;

  > input {
    height: 40px;
    padding-left: 40px;
  }

  > .searchForm__icon {
    position: absolute;
    left: 12px;
    top: 5px;
    font-size: 20px;
    color: #666;
  }
`

const Form = styled.form`
  &.focused ${DropdownInputWrapper} > input {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  @media (min-width: 768px) {
    ${DropdownInputWrapper} {
      max-width: 450px;
      transition: max-width 0.1s;
    }

    &.focused {
      ${DropdownInputWrapper} {
        max-width: 600px;
      }

      .searchForm__icon {
        color: ${props => props.theme.colorPrimary};
      }
    }
  }
`

const Menu = styled(DropdownMenu)`
  margin-top: 0 !important;
  top: 100%;
  left: 0;
  right: 0;
  border-top: 1px solid #ddd;
  padding-bottom: 10px;
  border-radius: 0 0 4px 4px !important;
  box-shadow: none !important;
`

const Options = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`

const OptionItem = styled.li`
  padding: 10px 12px;
  cursor: pointer;

  > .icon {
    margin-right: 9px;
    font-size: 18px;
    width: 20px;
    text-align: center;
  }

  &:focus,
  &:hover {
    background: #f0f0f0;
  }
`

const { placeholder } = defineMessages({
  placeholder: {
    id: 'searchForm.placeholder',
    defaultMessage: 'Busque vagas de voluntariado ou ONGs',
  },
})

interface SearchFormProps {
  readonly className?: string
}

interface SearchFormState {
  focused: boolean
}

class SearchForm extends React.Component<
  SearchFormProps & InjectedIntlProps,
  SearchFormState
> {
  dropdown: Dropdown | null

  static defaultProps = {
    className: undefined,
  }

  state = {
    focused: false,
  }

  open = () => {
    if (this.dropdown) {
      this.dropdown.show()
    }
  }

  handleDropdownStateChange = (focused: boolean) => {
    this.setState({ focused })
  }

  resolveOptionIcon = (type: string): string => {
    if (type === 'address') {
      return 'place'
    }

    if (type === 'cause') {
      return 'favorite_border'
    }

    return 'search'
  }

  render() {
    const { intl, className } = this.props
    const { focused } = this.state
    const options: SearchOption[] = [
      {
        id: 'abac',
        type: 'query',
        label: 'Abacate',
        value: 'Abacate',
      },
      {
        id: 'aba123c',
        type: 'address',
        label: 'São Paulo, SP, Brasil',
        value: {
          id: 'qwe',
          description: 'qwe',
          address_components: [],
        },
      },
      {
        id: '21312',
        type: 'cause',
        label: 'Educação',
        value: 'qwe',
      },
      {
        id: 'aba123112c',
        type: 'address',
        label: 'Pinheiros, São Paulo',
        value: {
          id: 'qwe',
          description: 'qwe',
          address_components: [],
        },
      },
      {
        id: ';masf',
        type: 'address',
        label: 'Pinheiros, Pnheiros',
        value: {
          id: 'qwe',
          description: 'qwe',
          address_components: [],
        },
      },
      {
        id: ';123qwa',
        type: 'address',
        label: 'Pinheiros, São José dos Campos',
        value: {
          id: 'qwe',
          description: 'qwe',
          address_components: [],
        },
      },
    ]

    return (
      <Form
        className={`form-inline ml-0 mr-2 flex-grow ${
          className ? `${className} ` : ''
        }${focused ? 'focused' : ''}`}
      >
        <DropdownInputWrapper
          innerRef={ref => {
            this.dropdown = ref as Dropdown
          }}
          open={focused}
          onOpenStateChange={this.handleDropdownStateChange}
        >
          <Icon className="searchForm__icon" name="search" iconSet="material" />
          <input
            type="text"
            className="input border-transparent"
            placeholder={intl.formatMessage(placeholder)}
            onFocus={this.open}
          />
          <Menu>
            <Options>
              {options.map((option, i) => (
                <OptionItem key={option.id} tabIndex={i}>
                  <Icon
                    name={this.resolveOptionIcon(option.type)}
                    iconSet="material"
                    className="icon"
                  />
                  {option.type === 'query' && (
                    <span className="tc-muted">Buscar por </span>
                  )}
                  {option.label}
                  {option.type === 'cause' && (
                    <span className="tc-muted"> - Causa</span>
                  )}
                </OptionItem>
              ))}
            </Options>
          </Menu>
        </DropdownInputWrapper>
      </Form>
    )
  }
}

export default withIntl(SearchForm)
