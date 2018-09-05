import * as React from 'react'
import styled from 'styled-components'

const Nav = styled.ul`
  .nav-link {
    font-size: 14px;
  }

  &.nav-dark a.nav-link {
    color: rgba(255, 255, 255, 0.6);

    &:hover {
      color: #fff;
    }
  }
`

const Title = styled.h4`
  font-size: 16px !important;
  font-weight: 500;
`

interface FooterNavProps {
  readonly title: string
  readonly className?: string
}

const FooterNav: React.SFC<FooterNavProps> = ({
  title,
  children,
  className,
}) => (
  <Nav
    className={`nav flex-column ${
      className ? `${className} ` : ''
    }nav-dark nav-size-1`}
  >
    <Title className="nav-link mb-1">{title}</Title>
    {React.Children.map(children, (child: React.ReactElement<any>) => {
      if (child) {
        return React.cloneElement(child, {
          className: `${
            child.props.className ? `${child.props.className} ` : ''
          }nav-link`,
        })
      }

      return child
    })}
  </Nav>
)

FooterNav.displayName = 'FooterNav'
FooterNav.defaultProps = {
  className: undefined,
}

export default FooterNav
