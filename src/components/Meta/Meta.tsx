import * as React from 'react'
import Header from 'next/head'
import { defineMessages, InjectedIntlProps } from 'react-intl'
import { withIntl } from '~/lib/intl'

interface MetaProps {
  readonly title?: string
  readonly description?: string
  readonly image?: string
}

const messages = defineMessages({
  title: {
    id: 'meta.title',
    defaultMessage: 'Channel',
  },
  description: {
    id: 'meta.description',
    defaultMessage: 'Short channel description',
  },
})

const Meta: React.SFC<MetaProps & InjectedIntlProps> = props => {
  const { intl } = props
  const {
    title = intl.formatMessage(messages.title),
    description = intl.formatMessage(messages.description),
    image,
  } = props
  return (
    <Header>
      {title && <title>{title}</title>}
      {title && <meta name="title" content={title} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta name="image" content={description} />}
      {image && <meta property="og:image" content={description} />}
    </Header>
  )
}

Meta.displayName = 'Meta'

export default withIntl(Meta)
