import React from 'react'
import { NextStatelessComponent } from 'next'
import { withIntl } from '~/lib/intl'
import json from '~/channel/pages/home.json'
import { Editor } from '~/components/ContentEditor'
import schema from '~/components/ContentEditor/schema'

const Home: NextStatelessComponent = () => (
  <Editor schema={schema} defaultValue={json.document} />
)

export default withIntl(Home)
