import React from 'react'

interface IconProps {
  name: string
  className?: string
}

const Icon: React.SFC<IconProps> = ({ name, className, ...props }) => (
  <span className={`fa fa-${name} ${className}`} {...props} />
)
Icon.displayName = 'Icon'

export default Icon
