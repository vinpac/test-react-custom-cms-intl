import * as React from 'react'
import styled from 'styled-components'
import Dropdown, { DropdownMenu } from '~/components/Dropdown'

const Menu = styled(DropdownMenu)``

interface ToolbarTimelineProps {
  readonly open?: boolean
  readonly className?: string
}

interface ToolbarTimelineState {
  open: boolean
}

class ToolbarTimeline extends React.Component<
  ToolbarTimelineProps,
  ToolbarTimelineState
> {
  static defaultProps = {
    className: undefined,
  }
  static getDerivedStateFromProps(
    props: ToolbarTimelineProps,
    state?: ToolbarTimelineState,
  ): ToolbarTimelineState {
    return {
      open: state ? state.open : props.open || false,
    }
  }

  constructor(props) {
    super(props)

    this.state = ToolbarTimeline.getDerivedStateFromProps(props)
  }

  haandleOpenStateChange = (open: boolean) => {
    console.log('received = ', open)
    this.setState({
      open,
    })
  }

  handleButtonClick = () => this.setState({ open: !this.state.open })

  render() {
    const { open } = this.state

    return (
      <Dropdown open={open} onOpenStateChange={this.haandleOpenStateChange}>
        <button
          className="btn btn-plain-text nav-link tw-normal"
          onClick={this.handleButtonClick}
        >
          Inscrições
        </button>
        <Menu>qwe</Menu>
      </Dropdown>
    )
  }
}

export default ToolbarTimeline
