import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import Icon from '~/components/Icon'

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 500;
  transition: background 0.5s, opacity 0.5s;
  padding: 60px 15px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.4);
  display: none;

  &.open {
    display: block;
  }
`

const Body = styled.div`
  margin: 0 auto;
  position: relative;
  max-width: 552px;
`

const CloseButton = styled.button.attrs({ className: 'btn' })`
  border-radius: 50%;
  padding: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  font-size: 20px;
  width: 42px;
  height: 42px;
`

interface ModalProps {
  readonly closeOnBackdropClick?: boolean
  readonly onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  readonly className?: string
  readonly onClose?: () => void
  readonly open?: boolean
  readonly defaultOpen?: boolean
}

interface ModalState {
  readonly open: boolean
}

class Modal extends React.Component<ModalProps, ModalState> {
  body: HTMLDivElement

  static defaultProps = {
    closeOnBackdropClick: true,
    className: undefined,
  }

  static getDerivedStateFromProps(
    props: ModalProps,
    state?: ModalState,
  ): ModalState {
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

    this.state = Modal.getDerivedStateFromProps(props, undefined)
  }

  close = () => {
    const { onClose } = this.props

    if (onClose) {
      onClose()
    }
  }

  handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { open } = this.state
    if (event && event.target && open) {
      try {
        // eslint-disable-next-line
        const bodyNode = ReactDOM.findDOMNode(this.body)

        if (!bodyNode.contains(event.target) || bodyNode === event.target) {
          this.close()
        }
      } catch (error) {
        throw error
      }
    }
  }

  render() {
    const { className, closeOnBackdropClick, onClick, children } = this.props
    const { open } = this.state

    return (
      <Backdrop
        onClick={closeOnBackdropClick ? this.handleBackdropClick : onClick}
        className={`${className ? `${className} ` : ''}${open ? 'open' : ''}`}
      >
        <CloseButton onClick={this.close}>
          <Icon name="clear" iconSet="material" />
        </CloseButton>
        <Body
          innerRef={ref => {
            this.body = ref
          }}
        >
          {children}
        </Body>
      </Backdrop>
    )
  }
}

export default Modal
