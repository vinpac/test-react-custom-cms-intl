import React from 'react'
import { NextStatelessComponent } from 'next'
import { withIntl } from '~/lib/intl'
import json from '~/channel/pages/home.json'
import { Renderer } from '~/components/ContentEditor'
import schema from '~/components/ContentEditor/schema'

const Home: NextStatelessComponent = () => (
  <Renderer document={json.document} schema={schema} />
)

export default withIntl(Home)
