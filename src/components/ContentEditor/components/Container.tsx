import * as React from 'react'

interface ContainerProps {
  readonly children: React.ReactNode
  readonly className?: string
}

const Container: React.SFC<ContainerProps> = ({ className, children }) => (
  <div className={`container ${className}`}>{children}</div>
)
Container.displayName = 'Container'
Container.defaultProps = {
  className: '',
}

export default Container
