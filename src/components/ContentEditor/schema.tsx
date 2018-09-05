import Container from '~/components/ContentEditor/components/Container'
import Markdown from '~/components/ContentEditor/components/Markdown'
import Toolbar, { ToolbarNav } from '~/components/Toolbar'
import Footer from '~/components/Footer'
import {
  Carousel,
  CarouselIndicators,
  CarouselItem,
} from '~/components/Carousel'
import InternalLink from '~/components/ContentEditor/components/InternalLink'
import { ModalLink } from '~/components/Modal'
import Catalogue from '~/components/Catalogue'
import PaddingModifier from '~/components/ContentEditor/modifiers/Padding'
import RadiusModifier from '~/components/ContentEditor/modifiers/Radius'
import BackgroundModifier from '~/components/ContentEditor/modifiers/Background'
import MarginModifier from '~/components/ContentEditor/modifiers/Margin'
import Schema from '~/components/ContentEditor/models/Schema'
import CausesSection from '~/components/CausesSection'
import CatalogueSection from '~/components/Catalogue/CatalogueSection'
import setupChannelSchema from '~/channel/index'
import ProjectCard from '~/components/ProjectCard'
import ToolbarMessages from '~/components/ToolbarMessages'
import ToolbarTimeline from '~/components/ToolbarTimeline'

// const stylePropertyControl = {
//   type: ControlType.Object,
//   label: 'Style',
//   controls: {
//     backgroundColor: {
//       type: ControlType.Color,
//       label: 'Cor',
//     },
//     backgroundImage: {
//       type: ControlType.String,
//       label: 'Imagem',
//       format: "url('$0')",
//       addon: {
//         type: 'icon',
//         name: 'link',
//         set: 'material',
//       },
//     },
//     backgroundSize: {
//       type: ControlType.SegmentedEnum,
//       label: 'Size',
//       options: [
//         {
//           value: 'auto',
//           label: 'Auto',
//         },
//         {
//           value: 'cover',
//           label: 'Cover',
//         },
//         {
//           value: 'contain',
//           label: 'contain',
//         },
//       ],
//     },
//     backgroundPosition: {
//       type: ControlType.SegmentedEnum,
//       label: 'Position',
//       options: [
//         {
//           value: 'initial',
//           label: 'Auto',
//         },
//         {
//           value: 'center',
//           label: 'Center',
//         },
//       ],
//     },
//     backgroundRepeat: {
//       type: ControlType.SegmentedEnum,
//       label: 'Repeat',
//       options: [
//         {
//           value: 'no-repeat',
//           label: 'Disabled',
//         },
//         {
//           value: 'repeat',
//           label: 'Both',
//         },
//         {
//           value: 'repeat-x',
//           label: 'X',
//         },
//         {
//           value: 'repeat-y',
//           label: 'Y',
//         },
//       ],
//     },
//   },
// }

const schema = new Schema({
  plainTypes: ['div'],
  modifiers: {
    Padding: PaddingModifier,
    Radius: RadiusModifier,
    Background: BackgroundModifier,
    Margin: MarginModifier,
  },
  components: {
    ToolbarMessages,
    ToolbarTimeline,
    CatalogueSection,
    Catalogue,
    CarouselIndicators,
    ProjectCard,
    Container,
    Footer,
    ModalLink,
    InternalLink,
    CausesSection,
    CarouselItem,
    Carousel,
    Toolbar,
    ToolbarNav,
    Markdown,
  },
})

export default setupChannelSchema(schema)
