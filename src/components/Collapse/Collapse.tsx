import * as React from 'react'

interface CollapseProps {
  readonly containerClassName?: string
  readonly className?: string
  readonly collapsed?: boolean
  readonly children?: React.ReactNode
}

interface CollapseState {
  collapsed: boolean
  style?: React.CSSProperties
}

class Collapse extends React.Component<CollapseProps, CollapseState> {
  timeout?: number
  container?: HTMLDivElement | null

  static defaultProps = {
    className: undefined,
  }

  static getDerivedStateFromProps(props: CollapseProps, state): CollapseState {
    let collapsed =
      props.collapsed !== undefined ? props.collapsed : state.collapsed
    return {
      collapsed,
      style: state.style
        ? state.style
        : collapsed
          ? { height: '0', overflow: 'hidden' }
          : {},
    }
  }

  componentDidUpdate(prevProps: CollapseProps) {
    const { collapsed } = this.props

    if (collapsed !== undefined && prevProps.collapsed !== collapsed) {
      this.setCollapsedState(collapsed)
    }
  }

  state = {
    collapsed: false,
    style: undefined,
  }

  setCollapsedState = (collapse: boolean) => {
    if (!this.container) {
      return
    }

    clearTimeout(this.timeout)

    let timeout
    let startState
    let nextState

    if (!collapse) {
      timeout = 350
      startState = {
        collapsed: false,
        style: {
          overflow: 'hidden',
          boxShadow: 'none',
          height: this.container.clientHeight,
        },
      }
      nextState = { style: undefined }
    } else {
      timeout = 20
      startState = {
        collapsed: true,
        style: {
          overflow: 'hidden',
          boxShadow: 'none',
          height: this.container.clientHeight,
        },
      }
      nextState = {
        style: {
          overflow: 'hidden',
          height: 0,
          boxShadow: 'none',
        },
      }
    }

    this.setState(startState, () => {
      this.timeout = setTimeout(() => this.setState(nextState), timeout)
    })
  }

  render() {
    const { collapsed, children, containerClassName, ...props } = this.props
    const { style } = this.state

    return (
      <div {...props} style={style}>
        <div
          ref={container => {
            this.container = container
          }}
          className={containerClassName}
        >
          {children}
        </div>
      </div>
    )
  }
}

export default Collapse
