import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'

export const DropdownMenu = styled.div.attrs({ className: 'dropdown-menu' })`
  background: #fff;
  border-radius: 4px;
  position: absolute;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25), 0 0 1px rgba(0, 0, 0, 0.35);
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  z-index: 9;
  display: none;
`

const Container = styled.div`
  position: relative;

  &.open .dropdown-menu {
    display: block;
  }
`

type Direction = 'up' | 'left' | 'right' | 'down'
export interface DropdownProps {
  readonly open?: boolean
  readonly defaultOpen?: boolean
  readonly onOpenStateChange?: (open: boolean) => void
  readonly closeOnOutClick?: boolean
  readonly direction?: Direction
  readonly className?: string
}

interface DropdownState {
  readonly open: boolean
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  static defaultProps: Partial<DropdownProps> = {
    direction: 'down',
    closeOnOutClick: true,
  }

  static getDerivedStateFromProps(
    props: DropdownProps,
    state?: DropdownState,
  ): DropdownState {
    return {
      open:
        props.open !== undefined
          ? props.open
          : state
            ? state.open
            : props.defaultOpen || false,
    }
  }

  constructor(props) {
    super(props)

    this.state = Dropdown.getDerivedStateFromProps(props)
  }

  componentDidMount() {
    const { closeOnOutClick } = this.props
    const { open } = this.state

    if (open && closeOnOutClick) {
      document.addEventListener('mousedown', this.handleDocumentClick)
    }
  }

  componentDidUpdate(prevProps: DropdownProps, prevState: DropdownState) {
    const { closeOnOutClick } = this.props

    if (
      this.state.open &&
      prevProps.closeOnOutClick &&
      !this.props.closeOnOutClick
    ) {
      document.removeEventListener('mousedown', this.handleDocumentClick)
      return
    }

    if (prevState.open !== this.state.open && closeOnOutClick) {
      if (closeOnOutClick) {
        document.addEventListener('mousedown', this.handleDocumentClick)
      }
    }
  }

  show = () => {
    const { open, onOpenStateChange } = this.props
    if (open !== undefined) {
      if (onOpenStateChange) {
        onOpenStateChange(true)
      }
    } else {
      this.setState(
        { open: true },
        onOpenStateChange
          ? () => {
              onOpenStateChange(this.state.open)
            }
          : undefined,
      )
    }
  }

  hide = () => {
    const { open, onOpenStateChange } = this.props

    if (open !== undefined) {
      if (onOpenStateChange) {
        onOpenStateChange(false)
      }
    } else {
      this.setState(
        { open: false },
        onOpenStateChange
          ? () => {
              onOpenStateChange(false)
            }
          : undefined,
      )
    }
  }

  handleDocumentClick = (event: MouseEvent) => {
    const { open } = this.state

    if (open && event && event.target) {
      try {
        const node = ReactDOM.findDOMNode(this)
        if (!node.contains(event.target)) {
          document.removeEventListener('mousedown', this.handleDocumentClick)
          this.hide()
        }
      } catch (err) {
        document.removeEventListener('mousedown', this.handleDocumentClick)
      }
    }
  }

  render() {
    const { className, direction, children } = this.props
    const { open } = this.state

    return (
      <Container
        className={`${
          className ? `${className} ` : ''
        }dropdown-direction-${direction}${open ? ` open` : ''}`}
      >
        {children}
      </Container>
    )
  }
}

export default Dropdown
