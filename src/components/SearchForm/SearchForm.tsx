import * as React from 'react'
import styled from 'styled-components'
import { defineMessages, InjectedIntlProps } from 'react-intl'
import { withIntl } from '~/lib/intl'

const Form = styled.form.attrs({
  className: 'form-inline ml-0 mr-2 flex-grow',
})`
  > input {
    height: 40px;
  }

  @media (min-width: 768px) {
    > input {
      max-width: 600px;
      transition: max-width 0.1s;

      &:focus {
        max-width: 680px;
      }
    }
  }
`

const { placeholder } = defineMessages({
  placeholder: {
    id: 'searchForm.placeholder',
    defaultMessage:
      'Buscar vagas de voluntariado por causa, habilidade, endereço…',
  },
})

interface SearchFormProps {
  readonly className?: string
}

interface SearchFormState {}

class SearchForm extends React.Component<
  SearchFormProps & InjectedIntlProps,
  SearchFormState
> {
  static defaultProps = {
    className: undefined,
  }
  static getDerivedStateFromProps(): SearchFormState {
    return {}
  }

  state = {}

  render() {
    const { intl, className } = this.props

    return (
      <Form className={className}>
        <input
          type="text"
          className="input border-transparent"
          placeholder={intl.formatMessage(placeholder)}
        />
      </Form>
    )
  }
}

export default withIntl(SearchForm)
