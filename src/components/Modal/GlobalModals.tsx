import * as React from 'react'

export interface GlobalModalsContextType {
  openModal?: (modalId: string, props?: object) => void
}
export const GlobalModalsContext: React.Context<
  GlobalModalsContextType
> = React.createContext({})

interface GlobalModalsProps {
  readonly className?: string
  readonly modals: {
    [modalId: string]: React.ComponentType<{ onClose: Function }>
  }
}

interface GlobalModalsState {
  openModal?: (modalId: string, props?: object) => void
  openModals: {
    id: string
    props?: object
  }[]
}

class GlobalModals extends React.Component<
  GlobalModalsProps,
  GlobalModalsState
> {
  static defaultProps = {
    className: undefined,
  }

  constructor(props) {
    super(props)

    this.state = {
      openModal: this.openModal,
      openModals: [],
    }
  }

  openModal = (modalId: string, props?: object) => {
    if (this.state.openModals.some(modal => modal.id === modalId)) {
      // Prevent opening a modal twice
      return
    }

    this.setState({
      openModals: [
        ...this.state.openModals,
        {
          id: modalId,
          props,
        },
      ],
    })
  }

  handleModalClose = (modalId: string) => {
    const { openModals } = this.state

    this.setState({
      openModals: openModals.filter(modal => modal.id !== modalId),
    })
  }

  render() {
    const { children, modals } = this.props
    const { openModals } = this.state

    return (
      <GlobalModalsContext.Provider value={this.state}>
        <>
          {openModals.map(modal => {
            const ModalComponent = modals[modal.id]

            return (
              <ModalComponent
                key={modal.id}
                {...modal.props}
                onClose={() => this.handleModalClose(modal.id)}
              />
            )
          })}
          {children}
        </>
      </GlobalModalsContext.Provider>
    )
  }
}

export default GlobalModals
