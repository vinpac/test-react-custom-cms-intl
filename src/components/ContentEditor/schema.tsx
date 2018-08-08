import { Schema } from '~/components/ContentEditor/types'
import Container from '~/components/ContentEditor/components/Container'
import Markdown from '~/components/ContentEditor/components/Markdown'
import PaddingModifier from '~/components/ContentEditor/modifiers/Padding'

const schema: Schema = {
  plainTypes: ['div'],
  modifiers: {
    Padding: PaddingModifier,
  },
  types: {
    Container,
    Markdown,
  },
}

export default schema
