import React from 'react'
import { NextStatelessComponent } from 'next'
import { withIntl } from '~/lib/intl'
import schema from '~/components/ContentEditor/schema'
import { RenderableDocument } from '~/components/ContentEditor/types'
import { Renderer } from '~/components/ContentEditor'
import { NotFoundPageError } from '~/lib/next/errors'
import * as CMS from '~/lib/cms'
import { loadData } from '~/components/ContentEditor/DataLoader'
import { DataMap } from '~/components/ContentEditor/Renderer'

interface HomeProps {
  slug: string
  loadedData: DataMap
  json: { document: RenderableDocument }
}

const Home: NextStatelessComponent<HomeProps> = ({
  slug,
  loadedData,
  json,
}) => (
  <Renderer
    key={slug}
    schema={schema}
    loadedData={loadedData}
    document={json.document}
  />
)

Home.getInitialProps = async ({ query: { slug } }) => {
  try {
    const json = await CMS.get(`pages/${slug}`)
    const loadedData = await loadData(json.document, schema)

    return { slug: slug as string, loadedData, json }
  } catch (error) {
    if (error instanceof CMS.NotFound) {
      throw new NotFoundPageError()
    }

    throw error
  }
}

export default withIntl(Home)
