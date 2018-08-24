import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Header = styled.div`
  background: #191819;
  border-style: solid;
  border-color: #000;
  border-width: 1px 0 1px 0;
  height: 36px;
  padding: 8px;
`

const Body = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
`

const Title = styled.h3`
  font-size: 14px;
  color: #fff;
  font-weight: normal;
`

const Description = styled.span`
  font-weight: normal;
  color: #999;
  font-size: 14px;
`

interface EditorSidebarSectionProps {
  readonly title: string
  readonly headerChildren?: React.ReactNode
  readonly children: React.ReactNode
  readonly className?: string
  readonly icon?: React.ReactNode
  readonly style?: React.CSSProperties
  readonly description?: string
}

const EditorSidebarSection: React.SFC<EditorSidebarSectionProps> = ({
  style,
  icon,
  title,
  description,
  headerChildren,
  children,
  className,
}) => (
  <Container className={className} style={style}>
    <Header>
      <Title>
        {icon}
        {title}
        {description && <Description> - {description}</Description>}
      </Title>
      {headerChildren}
    </Header>
    <Body>{children}</Body>
  </Container>
)

EditorSidebarSection.displayName = 'EditorSidebarSection'
EditorSidebarSection.defaultProps = {
  className: undefined,
}

export default EditorSidebarSection
