import * as React from 'react'
import AllocManager from '~/lib/allocation/AllocManager'
import { Project, Catalogue, Section } from '~/types/project'
import { fetchAPI } from '~/lib/fetch'
import {
  PropertyControls,
  ControlType,
} from '~/components/ContentEditor/models/controls'

interface CatalogueManagerContextType {
  getSectionBySlug?: (sectionId: string) => Section | undefined
  manager?: AllocManager<Project>
}
export const CatalogueManagerContext = React.createContext<
  CatalogueManagerContextType
>({})

interface CatalogueManagerProps {
  readonly slug: string
  readonly catalogue: Catalogue
}

interface CatalogueManagerState {
  getSectionBySlug?: (sectionId: string) => Section | undefined
  manager: AllocManager<Project>
}

class CatalogueManager extends React.Component<
  CatalogueManagerProps,
  CatalogueManagerState
> {
  manager: AllocManager<Project>

  static componentName: string = 'Catalogue'
  static propertyControls: PropertyControls<CatalogueManagerProps> = {
    slug: {
      type: ControlType.String,
      label: 'slug',
      placeholder: '...',
    },
  }

  static getInitialProps = ({ query: { slug } }) => {
    return fetchAPI(`/catalogue/${slug}/`)
      .then(catalogue => ({ catalogue }))
      .catch(() => ({
        catalogue: {
          slug,
          sections: [],
        },
      }))
  }

  static getDerivatedStateFromProps(
    props: CatalogueManagerProps,
    state?: CatalogueManagerState,
  ): CatalogueManagerState {
    const { catalogue } = props

    return {
      getSectionBySlug: state ? state.getSectionBySlug : undefined,
      manager: state
        ? state.manager
        : new AllocManager(
            catalogue.sections.map(section => ({
              id: section.slug,
              nodes: section.projects,
            })),
          ),
    }
  }

  constructor(props) {
    super(props)

    this.state = CatalogueManager.getDerivatedStateFromProps(props, {
      manager: new AllocManager(
        props.catalogue.sections.map(section => ({
          id: section.slug,
          nodes: section.projects,
        })),
      ),
      getSectionBySlug: this.getSectionBySlug,
    })
  }

  getSectionBySlug = (sectionSlug: string): Section | undefined => {
    const { catalogue } = this.props

    return catalogue.sections.find(section => section.slug === sectionSlug)
  }

  render() {
    const { children } = this.props

    return (
      <CatalogueManagerContext.Provider value={this.state}>
        {children}
      </CatalogueManagerContext.Provider>
    )
  }
}

export default CatalogueManager
