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
import {
  PropertyControls,
  ControlType,
} from '~/components/ContentEditor/models/controls'

const Navbar = styled.div`
  height: 56px;
`
interface WrapperProps {
  floating?: boolean
  navbarTheme: string
}
const Wrapper = styled<WrapperProps, 'div'>('div')`
  z-index: 20;

  ${props =>
    props.floating
      ? `
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    ${
      props.navbarTheme !== 'light'
        ? 'background: linear-gradient(0deg, rgba(0,0,0,0), rgba(0,0,0,.2));'
        : ''
    }

    .toolbar__searchForm input {
      box-shadow: 0 1px 2px rgba(0,0,0,.15), 0 0 1px rgba(0,0,0,.25);
    }
  `
      : `
  position: relative;
  background: ${props.theme.colorPrimary};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  `};
`
const Container = styled.div.attrs({ className: 'container' })`
  width: 100%;
`

const Brand = styled.a.attrs({ className: 'navbar-brand' })`
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
  readonly style?: React.CSSProperties
  readonly floating?: boolean
  readonly searchFormEnabled?: boolean
  readonly className?: string
  readonly children?: React.ReactNode
  readonly channel: Channel
  readonly navbarTheme?: 'dark' | 'light'
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
    navbarTheme: 'dark',
  }

  static propertyControls: PropertyControls<ToolbarProps> = {
    searchFormEnabled: {
      type: ControlType.Boolean,
      label: 'Buscar',
      enabled: 'Ativado',
      disabled: 'Desativado',
    },
  }

  static description =
    'Convert Pop Animation values to spring tension and friction.'

  state = { collapsed: true }

  toggleCollapse = () => this.setState({ collapsed: !this.state.collapsed })

  render() {
    const {
      style,
      floating,
      intl,
      channel,
      searchFormEnabled,
      className,
      children,
      navbarTheme,
    } = this.props
    const { collapsed } = this.state

    return (
      <Wrapper
        className={className}
        navbarTheme={navbarTheme}
        style={style}
        floating={floating}
      >
        <Navbar
          className={`navbar navbar-expand-lg px-0 navbar-${navbarTheme}`}
        >
          <Container>
            <Link href={{ pathname: 'render', query: { slug: 'home' } }} as="/">
              <Brand href="/">
                {channel.assets.toolbarBrand ? (
                  <img src={channel.assets.toolbarBrand} alt="" />
                ) : (
                  intl.formatMessage(appName)
                )}
              </Brand>
            </Link>
            {searchFormEnabled && (
              <SearchForm className="toolbar__searchForm" />
            )}
            <div className="mr-auto" />
            {children}
            <button
              className="btn d-lg-none navbar-toggler"
              onClick={this.toggleCollapse}
              type="button"
            >
              <div
                className={`hamburger hamburger-slider ${
                  navbarTheme === 'light' ? '' : 'hamburger-white'
                } ${!collapsed ? 'active' : ''}`}
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
