import { Schema } from '~/components/ContentEditor/types'
import Container from '~/components/ContentEditor/components/Container'
import Markdown from '~/components/ContentEditor/components/Markdown'
import Toolbar, { ToolbarNav } from '~/components/Toolbar'
import { CarouselItem } from '~/components/Carousel'
import EditorCarousel from '~/components/ContentEditor/components/EditorCarousel'
import InternalLink from '~/components/ContentEditor/components/InternalLink'
import { ModalLink } from '~/components/Modal'

import PaddingModifier from '~/components/ContentEditor/modifiers/Padding'
import RadiusModifier from '~/components/ContentEditor/modifiers/Radius'
import BackgroundModifier from '~/components/ContentEditor/modifiers/Background'
import MarginModifier from '~/components/ContentEditor/modifiers/Margin'

const schema: Schema = {
  plainTypes: ['div'],
  modifiers: {
    Padding: PaddingModifier,
    Radius: RadiusModifier,
    Background: BackgroundModifier,
    Margin: MarginModifier,
  },
  types: {
    Carousel: EditorCarousel,
    CarouselItem,
    Toolbar,
    ToolbarNav,
    InternalLink,
    ModalLink,
    Container,
    Markdown,
  },
}

export default schema
