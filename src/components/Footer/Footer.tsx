import * as React from 'react'
import styled from 'styled-components'
import FooterNav from './FooterNav'
import InternalLink from '~/components/ContentEditor/components/InternalLink'

interface ContainerProps {
  background?: string
}

const Container = styled<ContainerProps, 'div'>('div')`
  min-height: 500px;
  background: ${props => props.theme.colorPrimary};
`

interface FooterProps {
  readonly className?: string
}

const Footer: React.SFC<FooterProps> = ({ className }) => (
  <Container className={className}>
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4">
          <FooterNav title="Atados">
            <InternalLink as="/vagas" href="/qwe">
              Quem somos
            </InternalLink>
            <InternalLink as="/vagas" href="/qwe">
              Contato
            </InternalLink>
            <InternalLink as="/vagas" href="/qwe">
              Atados para empresas
            </InternalLink>
          </FooterNav>
        </div>
        <div className="col-md-4">
          <FooterNav title="Causas">
            <InternalLink as="/vagas" href="/qwe">
              Quem somos
            </InternalLink>
            <InternalLink as="/vagas" href="/qwe">
              Contato
            </InternalLink>
            <InternalLink as="/vagas" href="/qwe">
              Atados para empresas
            </InternalLink>
            <InternalLink as="/vagas" href="/qwe">
              Blog
            </InternalLink>
          </FooterNav>
        </div>
        <div className="col-md-4">
          <FooterNav title="Habilidades">
            <InternalLink as="/vagas" href="/qwe">
              Quem somos
            </InternalLink>
            <InternalLink as="/vagas" href="/qwe">
              Contato
            </InternalLink>
            <InternalLink as="/vagas" href="/qwe">
              Atados para empresas
            </InternalLink>
          </FooterNav>
        </div>
      </div>
    </div>
  </Container>
)

Footer.displayName = 'Footer'
Footer.defaultProps = {
  className: undefined,
}

export default Footer
