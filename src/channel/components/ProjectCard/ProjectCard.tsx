import * as React from 'react'
import styled from 'styled-components'
import BaseProjectCard from '~/components/ProjectCard'
import { Project } from '~/types/project'

const Bar = styled.div`
  width: 100%;
  height: 4px;
  margin-top: 5px;
  border-radius: 10px;
  background: #333;
`

interface ProjectCardProps extends Project {
  readonly className?: string
}

const ProjectCard: React.SFC<ProjectCardProps> = props => (
  <div>
    <BaseProjectCard {...props} />
    <Bar />
  </div>
)

ProjectCard.displayName = 'ProjectCard'

export default ProjectCard
