import * as React from 'react'
import { Converter } from 'showdown'

interface MarkdownProps {
  readonly value: string
}

const converter = new Converter()

const Markdown: React.SFC<MarkdownProps> = ({ value }) => (
  <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(value) }} />
)

Markdown.displayName = 'Markdown'

export default Markdown
