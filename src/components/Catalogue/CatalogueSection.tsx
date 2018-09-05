import * as React from 'react'
import styled from 'styled-components'
import { CatalogueManagerContext } from '~/components/Catalogue/CatalogueManager'
import AllocManager from '~/lib/allocation/AllocManager'
import { Project, Section } from '~/types/project'
import schema from '~/components/ContentEditor/schema'
import {
  PropertyControls,
  ControlType,
} from '~/components/ContentEditor/models/controls'

const Container = styled.div`
  margin-bottom: 3rem;
`

const Title = styled.h1`
  font-size: 24px;
  color: rgb(72, 72, 72);
  margin-bottom: 0;
`

interface CatalogueSectionProps {
  readonly length: number
  readonly className?: string
  readonly resolveSection?: (sectionId: string) => Section | undefined
  readonly manager: AllocManager<Project>
}

let ProjectCard
class CatalogueSection extends React.Component<CatalogueSectionProps> {
  id: string

  static defaultProps = {
    className: undefined,
  }

  static propertyControls: PropertyControls<CatalogueSectionProps> = {
    length: {
      label: 'Length',
      type: ControlType.Number,
      placeholder: '...',
    },
  }

  constructor(props: CatalogueSectionProps) {
    super(props)

    this.id = props.manager.alloc(props.length)
    this.state = {}

    if (!ProjectCard) {
      ProjectCard = schema.getComponent('ProjectCard')
    }
  }

  componentWillUnmount() {
    this.props.manager.deallocate(this.id)
  }

  render() {
    const { className, manager, resolveSection } = this.props
    const allocation = manager.get(this.id)
    const section = resolveSection ? resolveSection(allocation.id) : undefined

    if (!section || !ProjectCard) {
      return null
    }

    return (
      <Container className={className}>
        <Title className="mb-3">{section.name}</Title>
        <div className="row">
          {allocation.nodes.map(node => (
            <div key={node.slug} className="col-md-6 col-lg-3 mb-4">
              <ProjectCard {...node} />
            </div>
          ))}
        </div>
      </Container>
    )
  }
}

interface CatalogueSectionWrapperProps {
  length: number
}
const CatalogueSectionWrapper: React.SFC<CatalogueSectionWrapperProps> = ({
  length,
}) => (
  <CatalogueManagerContext.Consumer>
    {({ manager, getSectionBySlug }) =>
      manager ? (
        <CatalogueSection
          length={length}
          manager={manager}
          resolveSection={getSectionBySlug}
        />
      ) : null
    }
  </CatalogueManagerContext.Consumer>
)

CatalogueSectionWrapper.displayName = 'CatalogueSectionWrapper'

export default CatalogueSectionWrapper
