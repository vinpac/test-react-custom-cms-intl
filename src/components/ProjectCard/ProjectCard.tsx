import * as React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { InjectedIntlProps } from 'react-intl'
import { Project } from '~/types/project'
import Icon from '~/components/Icon'
import { withIntl } from '~/lib/intl'
import { formatDisponibility } from '~/lib/project/utils'

const Container = styled.div``
const Header = styled.div`
  position: relative;
  border-radius: 3px;
  // background: #eee;
  background-size: cover;
  margin-bottom: 8px;
`
const HeaderInner = styled.div`
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`
const Name = styled.h4`
  font-size: 1.125rem;
  margin-bottom: 5px;
  font-weight: 500;
`

const Anchor = styled.a`
  color: #383536;

  &:hover {
    color: #383536;
  }
`

const Author = styled.span`
  color: #bbb;
  display: block;
  font-size: 13px;
  margin-bottom: 5px;
`

const Description = styled.p`
  color: #5a606e;
  height: 84px;
  overflow: hidden;
  margin-bottom: 1rem;
  font-size: 14px;
`

const Info = styled.span`
  display: inline-block;
  font-size: 12px;
  background: #e9f4fc;
  border-radius: 4px;
  padding: 2px 6px;
  color: #005cc7;
  font-weight: 500;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  > span {
    vertical-align: top;
  }
`

const Footer = styled.div`
  margin: 0 -5px;

  > .col-6 {
    padding: 0 5px;
  }
`

interface ProjectCardProps extends Project {
  readonly className?: string
}

class ProjectCard extends React.Component<
  ProjectCardProps & InjectedIntlProps
> {
  link = (children: React.ReactNode) => {
    const { slug } = this.props

    return (
      <Link
        href={{ pathname: '/project', query: { slug } }}
        as={`/vaga/${slug}`}
      >
        <Anchor href={`/vaga/${slug}`}>{children}</Anchor>
      </Link>
    )
  }
  linkOrganization = (children: React.ReactNode) => {
    const {
      organization: { slug },
    } = this.props

    return (
      <Link href={{ pathname: '/ong', query: { slug } }} as={`/ong/${slug}`}>
        <a>{children}</a>
      </Link>
    )
  }

  render() {
    const {
      name,
      address,
      description,
      disponibility,
      image,
      intl,
      organization,
      className,
    } = this.props

    return (
      <Container className={className}>
        {this.link(
          <Header
            className="ratio"
            style={{
              backgroundImage: image ? `url('${image.image_url}')` : undefined,
            }}
          >
            <HeaderInner
              className="ratio-fill"
              style={{ paddingTop: '66.666666666%' }}
            />
          </Header>,
        )}
        <Author>por {this.linkOrganization(organization.name)}</Author>
        {this.link(<Name>{name}</Name>)}
        <Description>{description}</Description>
        <Footer className="row">
          {address && (
            <div className="col-6">
              <Info
                title={`${address.city_state && `${address.city_state}, `} ${
                  address.typed_address
                }`}
                className="w-100"
              >
                <Icon name="place" iconSet="material" />{' '}
                {address.city_state && `${address.city_state}, `}
                {address.typed_address}
              </Info>
            </div>
          )}
          {disponibility && (
            <div className="col-6">
              <Info>
                <Icon name="date_range" iconSet="material" />{' '}
                {formatDisponibility(disponibility, intl)}
              </Info>
            </div>
          )}
        </Footer>
      </Container>
    )
  }
}

export default withIntl(ProjectCard)
