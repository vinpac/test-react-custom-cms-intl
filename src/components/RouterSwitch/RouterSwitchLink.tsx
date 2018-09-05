import * as React from 'react'
import {
  Location,
  RouterSwitchContext,
} from '~/components/RouterSwitch/RouterSwitch'

interface RouterSwitchLinkProps {
  readonly href: string | Location
  readonly as?: string
  readonly className?: string
}

const RouterSwitchLink: React.SFC<RouterSwitchLinkProps> = ({
  href,
  children,
}) => (
  <RouterSwitchContext.Consumer>
    {({ push }) =>
      React.cloneElement(React.Children.only(children), {
        onClick: push
          ? (event: React.MouseEvent<HTMLElement>) => {
              event.preventDefault()
              if (!event.ctrlKey) {
                push(typeof href === 'string' ? { path: href } : href)
              }
            }
          : undefined,
      })
    }
  </RouterSwitchContext.Consumer>
)

RouterSwitchLink.displayName = 'RouterSwitchLink'
RouterSwitchLink.defaultProps = {
  className: undefined,
}

export default RouterSwitchLink
