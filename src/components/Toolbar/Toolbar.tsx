import * as React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { defineMessages, InjectedIntlProps } from 'react-intl'
import { connect } from 'react-redux'
import Collapse from '~/components/Collapse'
import SearchForm from '~/components/SearchForm'
import { RootState } from '~/redux/root-reducer'
import { Channel } from '~/types/channel'
import { withIntl } from '~/lib/intl'

const Navbar = styled.div.attrs({
  className: 'navbar navbar-dark navbar-expand-lg px-0',
})`
  height: 56px;
  background: ${props => props.theme.colorPrimary};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
`

const Wrapper = styled.div`
  position: relative;
`
const Container = styled.div.attrs({ className: 'container' })`
  width: 100%;
`

const Brand = styled.a.attrs({ className: 'navbar-brand' })`
  color: #fff !important;

  > img {
    height: 36px;
  }
`

const { appName } = defineMessages({
  appName: {
    id: 'app.name',
    defaultMessage: 'Channel name',
  },
})

interface ToolbarProps {
  readonly searchFormEnabled?: boolean
  readonly className?: string
  readonly children?: React.ReactNode
  readonly channel: Channel
}

interface ToolbarState {
  readonly collapsed: boolean
}

class Toolbar extends React.Component<
  ToolbarProps & InjectedIntlProps,
  ToolbarState
> {
  static defaultProps = {
    className: undefined,
    searchFormEnabled: true,
  }

  state = { collapsed: true }

  toggleCollapse = () => this.setState({ collapsed: !this.state.collapsed })

  render() {
    const { intl, channel, searchFormEnabled, className, children } = this.props
    const { collapsed } = this.state

    return (
      <Wrapper>
        <Navbar className={className}>
          <Container>
            <Link href="/">
              <Brand href="/">
                {channel.assets.toolbarBrand ? (
                  <img src={channel.assets.toolbarBrand} alt="" />
                ) : (
                  intl.formatMessage(appName)
                )}
              </Brand>
            </Link>
            {searchFormEnabled && <SearchForm />}
            <div className="mr-auto" />
            {children}
            <button
              className="btn d-lg-none navbar-toggler"
              onClick={this.toggleCollapse}
              type="button"
            >
              <div
                className={`hamburger hamburger-slider hamburger-white ${
                  !collapsed ? 'active' : ''
                }`}
              >
                <div className="hamburger-inner" />
              </div>
            </button>
          </Container>
        </Navbar>
        <Collapse
          collapsed={collapsed}
          className="navbar-collapse-dropdown bg-white"
          containerClassName="nav container px-0 flex-column ts-medium py-2"
        >
          <a href="" className="nav-link tc-base">
            Inicio
          </a>
          <div className="px-3 py-2">
            <hr className="my-0 w-100" />
          </div>
        </Collapse>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ channel }: RootState) => ({
  channel,
})

export default connect(mapStateToProps)(withIntl(Toolbar))
