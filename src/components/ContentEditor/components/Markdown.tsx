import * as React from 'react'
import { Converter } from 'showdown'

interface MarkdownProps {
  readonly value: string
  readonly className?: string
}

const converter = new Converter()

const Markdown: React.SFC<MarkdownProps> = ({ className, value }) => (
  <div
    className={className}
    dangerouslySetInnerHTML={{ __html: converter.makeHtml(value) }}
  />
)

Markdown.displayName = 'Markdown'

export default Markdown
