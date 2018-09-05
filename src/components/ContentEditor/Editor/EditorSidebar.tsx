import * as React from 'react'
import styled from 'styled-components'
import EditorSidebarLayersSection from '~/components/ContentEditor/Editor/EditorSidebarLayersSection'
import Value from '~/components/ContentEditor/models/Value'
import EditorSidebarLayerPropertiesSection from '~/components/ContentEditor/Editor/EditorSidebarLayerPropertiesSection'
import Icon from '~/components/Icon'

const Container = styled.div`
  height: 100%;
  background: #111012;
  width: 308px;
  border-right: 1px solid #282628;
  position: relative;
`

const Sidebar = styled.div`
  width: 48px;
  background: #0d0d0d;
  border-right: 1px solid #282628;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
`

const Body = styled.div`
  height: 100%;
  width: 260px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 48px;
`

const SidebarButton = styled.button`
  background: none;
  font-size: 28px;
  padding: 4px 9px;
  color: #aaa;
  border-radius: 50%;

  &.active {
    color: #2f98f9;
  }
`

export interface EditorSidebarProps {
  readonly className?: string
  readonly value: Value
  readonly dispatchChange: (value: Value) => void
}

interface SidebarSection {
  readonly key: string
  readonly component: React.ComponentType<any>
}

interface EditorSidebarState {
  readonly dividers: number[]
  readonly sections: SidebarSection[]
}

class EditorSidebar extends React.Component<
  EditorSidebarProps,
  EditorSidebarState
> {
  static defaultProps = {
    className: undefined,
  }

  state = {
    dividers: [300],
    sections: [
      { key: 'properties', component: EditorSidebarLayerPropertiesSection },
      { key: 'layers', component: EditorSidebarLayersSection },
    ],
  }

  render() {
    const { dispatchChange, value, className } = this.props
    const { sections, dividers } = this.state
    let top: number = 0

    return (
      <Container className={className}>
        <Sidebar>
          <SidebarButton className="btn active">
            <img src="/logo-white.svg" alt="Atados" width="28px" />
          </SidebarButton>
          <SidebarButton className="btn active">
            <Icon name="menu" iconSet="material" />
          </SidebarButton>
          <SidebarButton className="btn">
            <Icon name="dashboard" iconSet="material" />
          </SidebarButton>
        </Sidebar>
        <Body>
          {sections.map((section, i) => {
            const divider = dividers[i]
            let sectionTop: number = top
            top += divider

            return (
              <section.component
                key={section.key}
                value={value}
                dispatchChange={dispatchChange}
                style={
                  i === sections.length - 1
                    ? {
                        top: sectionTop,
                        bottom: 0,
                      }
                    : { top: sectionTop, height: divider }
                }
              />
            )
          })}
        </Body>
      </Container>
    )
  }
}

export default EditorSidebar
