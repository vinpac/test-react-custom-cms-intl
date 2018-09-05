import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Cause } from '~/types/channel'

export interface CausesSectionProps {
  readonly causes: Cause[]
}

const colors = [
  '#2D728F',
  '#3B8EA5',
  '#f85a40',
  '#F49E4C',
  '#AB3428',
  '#995D81',
  '#484A47',
]

const Container = styled.div`
  margin-bottom: 3rem;
`

const SectionTitle = styled.h3`
  font-size: 24px;
  color: rgb(72, 72, 72);
  margin-bottom: 0;
`

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #999;
`

const Name = styled.h4`
  font-size: 16px;
  color: #fff;
  position: absolute;
  left: 15px;
  right: 15px;
  bottom: 20px;
  font-weight: 500;
  text-align: center;
  z-index: 2;
  text-decoration: none;
  transition: bottom 0.3s;
`

const Card = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  background: #eee;
  border-radius: 4px;
  position relative;
  background-size: cover;
  background-position: center;

  &:hover ${Name} {
    bottom: 25px;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 4px;
    background-image: linear-gradient(0deg, rgba(0,0,0, .2), rgba(0,0,0, 0));
  }
`

const CausesSection: React.SFC<CausesSectionProps> = ({ causes, ...props }) => (
  <Container {...props}>
    <SectionTitle>Encontre sua causa</SectionTitle>
    <SectionSubtitle>
      Clique numa causa e encontre vagas relacionadas
    </SectionSubtitle>

    <div className="row">
      {causes.map((cause, i) => (
        <Link
          as={`/causa/${cause.slug}`}
          href={{ pathname: 'cause', query: { slug: cause.slug } }}
          key={cause.id}
        >
          <a className="col-6 col-md-4 col-lg-2 mb-4">
            <div className="ratio">
              <span
                className="ratio-fill"
                style={{
                  paddingTop: '100%',
                }}
              />
              <div className="ratio-body">
                <Card
                  style={{
                    backgroundColor: colors[i],
                    backgroundImage: cause.image
                      ? `url('${cause.image.image_url}')`
                      : undefined,
                  }}
                >
                  <Name>{cause.name}</Name>
                </Card>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  </Container>
)

CausesSection.displayName = 'CausesSection'

const mapStateToProps = ({ channel }) => ({
  causes: channel.causes.slice(0, 6),
})

export default connect(
  mapStateToProps,
  {},
)(CausesSection)
