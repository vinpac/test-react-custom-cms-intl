import React from 'react'
import { NextStatelessComponent } from 'next'
import { withIntl } from '~/lib/intl'
import schema from '~/components/ContentEditor/schema'
import { RenderableDocument } from '~/components/ContentEditor/types'
import ContentEditor from '~/components/ContentEditor/Editor'
import { NotFoundPageError } from '~/lib/next/errors'
import * as CMS from '~/lib/cms'

interface HomeProps {
  slug: string
  json: { document: RenderableDocument }
}

const Home: NextStatelessComponent<HomeProps> = ({ slug, json }) => (
  <ContentEditor key={slug} schema={schema} defaultValue={json.document} />
)

Home.getInitialProps = async ({ query: { slug } }) => {
  try {
    const json = await CMS.get(slug as string)
    return { slug: slug as string, json }
  } catch (error) {
    if (error instanceof CMS.NotFound) {
      throw new NotFoundPageError()
    }

    throw error
  }
}

export default withIntl(Home)
