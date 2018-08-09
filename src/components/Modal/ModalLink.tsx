import * as React from 'react'
import { GlobalModalsContext } from '~/components/Modal/GlobalModals'

interface ModalLinkProps {
  readonly className?: string
  readonly modalId: string
  readonly children: React.ReactNode
  readonly modalProps?: object
}

const ModalLink: React.SFC<ModalLinkProps> = ({
  modalId,
  modalProps,
  className,
  children,
}) => (
  <GlobalModalsContext.Consumer>
    {({ openModal }) => (
      <a
        href=""
        className={className}
        onClick={event => {
          event.preventDefault()
          if (openModal) {
            openModal(modalId, modalProps)
          }
        }}
      >
        {children}
      </a>
    )}
  </GlobalModalsContext.Consumer>
)

ModalLink.displayName = 'ModalLink'
ModalLink.defaultProps = {
  className: undefined,
}

export default ModalLink
