import Container from '~/components/ContentEditor/components/Container'
import Markdown from '~/components/ContentEditor/components/Markdown'
import Toolbar, { ToolbarNav } from '~/components/Toolbar'
import {
  Carousel,
  CarouselIndicators,
  CarouselItem,
} from '~/components/Carousel'
import InternalLink from '~/components/ContentEditor/components/InternalLink'
import { ModalLink } from '~/components/Modal'
import PaddingModifier from '~/components/ContentEditor/modifiers/Padding'
import RadiusModifier from '~/components/ContentEditor/modifiers/Radius'
import BackgroundModifier from '~/components/ContentEditor/modifiers/Background'
import MarginModifier from '~/components/ContentEditor/modifiers/Margin'
import Schema from '~/components/ContentEditor/models/Schema'
import { ControlType } from '~/components/ContentEditor/models/controls'

const stylePropertyControl = {
  type: ControlType.Object,
  label: 'Style',
  controls: {
    backgroundColor: {
      type: ControlType.Color,
      label: 'Cor',
    },
    backgroundImage: {
      type: ControlType.String,
      label: 'Imagem',
      format: "url('$0')",
      addon: {
        type: 'icon',
        name: 'link',
        set: 'material',
      },
    },
    backgroundSize: {
      type: ControlType.SegmentedEnum,
      label: 'Size',
      options: [
        {
          value: 'auto',
          label: 'Auto',
        },
        {
          value: 'cover',
          label: 'Cover',
        },
        {
          value: '100%',
          label: '100%',
        },
      ],
    },
    backgroundPosition: {
      type: ControlType.SegmentedEnum,
      label: 'Position',
      options: [
        {
          value: 'initial',
          label: 'Auto',
        },
        {
          value: 'center',
          label: 'Center',
        },
      ],
    },
    backgroundRepeat: {
      type: ControlType.SegmentedEnum,
      label: 'Repeat',
      options: [
        {
          value: 'no-repeat',
          label: 'Disabled',
        },
        {
          value: 'repeat',
          label: 'Both',
        },
        {
          value: 'repeat-x',
          label: 'X',
        },
        {
          value: 'repeat-y',
          label: 'Y',
        },
      ],
    },
  },
}

export default new Schema({
  plainTypes: ['div'],
  modifiers: {
    Padding: PaddingModifier,
    Radius: RadiusModifier,
    Background: BackgroundModifier,
    Margin: MarginModifier,
  },
  components: {
    CarouselIndicators: {
      component: CarouselIndicators,
      filterParent: (kind: string) => {
        if (kind === 'Carousel') {
          return true
        }

        return false
      },
    },
    Carousel: {
      component: Carousel,
      propertyControls: {
        rotateEach: {
          type: ControlType.Number,
          label: 'Transition',
          placeholder: 'Tempo de loop',
        },
        style: {
          ...stylePropertyControl,
          controls: {
            ...stylePropertyControl.controls,
            height: {
              label: 'Height',
              type: ControlType.Number,
            },
          },
        },
      },
      filterChildren: (kind: string) => {
        if (kind === 'CarouselItem' || kind === 'CarouselIndicators') {
          return true
        }

        return false
      },
      filterParent: (kind: string) => {
        if (kind !== 'Carousel') {
          return true
        }

        return false
      },
    },
    CarouselItem: {
      component: CarouselItem,
      propertyControls: {
        style: stylePropertyControl,
      },
      filterParent: (kind: string) => {
        if (kind === 'Carousel') {
          return true
        }

        return false
      },
    },
    Toolbar: {
      name: 'Toolbar',
      component: Toolbar,
      propertyControls: {
        searchFormEnabled: {
          type: ControlType.Boolean,
          label: 'Buscar',
          enabled: 'Ativado',
          disabled: 'Desativado',
        },
      },
      description:
        'Convert Pop Animation values to spring tension and friction.',
    },
    ToolbarNav: { component: ToolbarNav },
    InternalLink: {
      component: InternalLink,
      propertyControls: {
        href: {
          type: ControlType.String,
          label: 'Href',
          placeholder: 'Destino',
        },
        as: {
          type: ControlType.String,
          label: 'as',
          placeholder: 'Link',
        },
      },
    },
    ModalLink: {
      component: ModalLink,
      propertyControls: {
        modalId: {
          type: ControlType.String,
          label: 'Modal',
          placeholder: 'Destino',
        },
      },
    },
    Container: { component: Container },
    Markdown: { component: Markdown },
  },
})
