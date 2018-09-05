import * as React from 'react'
import styled from 'styled-components'
import Dropdown, { DropdownMenu } from '~/components/Dropdown'

const Menu = styled(DropdownMenu)``

interface ToolbarMessagesProps {
  readonly open?: boolean
  readonly className?: string
}

interface ToolbarMessagesState {
  open: boolean
}

class ToolbarMessages extends React.Component<
  ToolbarMessagesProps,
  ToolbarMessagesState
> {
  static defaultProps = {
    className: undefined,
  }
  static getDerivedStateFromProps(
    props: ToolbarMessagesProps,
    state?: ToolbarMessagesState,
  ): ToolbarMessagesState {
    return {
      open: state ? state.open : props.open || false,
    }
  }

  constructor(props) {
    super(props)

    this.state = ToolbarMessages.getDerivedStateFromProps(props)
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
          Mensagens
        </button>
        <Menu>qwe</Menu>
      </Dropdown>
    )
  }
}

export default ToolbarMessages
