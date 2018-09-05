import * as React from 'react'
import Modal, { ModalCard } from '~/components/Modal'
import RouterSwitch, {
  Link as RouterSwitchLink,
} from '~/components/RouterSwitch'

interface AuthenticationProps {
  readonly defaultPath?: string
  readonly successRedirect?: string
  readonly failedRedirect?: string
  readonly registerError: string
  readonly loginError: string
  readonly className?: string
  readonly onClose: () => void
  readonly defaultOpen: boolean
}

const AuthenticationLogin = () => (
  <div style={{ minHeight: '300px' }}>
    Login
    <RouterSwitchLink href="/register">
      <a href="/enter">Register</a>
    </RouterSwitchLink>
  </div>
)
const AuthenticationRegister = () => (
  <div style={{ minHeight: '900px' }}>
    <h1>Login</h1>
    <RouterSwitchLink href="/login">
      <a href="/enter" className="btn btn-primary">
        Login
      </a>
    </RouterSwitchLink>
  </div>
)
const AuthenticationRecover = () => (
  <h1 style={{ minHeight: '500px' }}>Recover</h1>
)

const Authentication: React.SFC<AuthenticationProps> = ({
  defaultPath,
  registerError,
  loginError,
  successRedirect,
  failedRedirect,
  onClose,
}) => (
  <Modal defaultOpen onClose={onClose}>
    <ModalCard>
      <RouterSwitch
        defaultPath={defaultPath}
        transition="fade-up"
        routes={[
          {
            path: '/register',
            component: AuthenticationRegister,
            props: {
              error: registerError,
              successRedirect,
              failedRedirect,
            },
          },
          {
            path: '/recover',
            component: AuthenticationRecover,
          },
          {
            path: '/login',
            component: AuthenticationLogin,
            props: {
              error: loginError,
              successRedirect,
              failedRedirect,
            },
          },
        ]}
      />
    </ModalCard>
  </Modal>
)

Authentication.displayName = 'Authentication'
Authentication.defaultProps = {
  defaultPath: '/login',
  className: undefined,
}

export default Authentication
