import React from 'react'

export interface IconProps {
  name: string
  iconSet?: 'material'
  className?: string
  style?: React.CSSProperties
}

const Icon: React.SFC<IconProps> = ({ name, iconSet, className, ...props }) =>
  iconSet === 'material' ? (
    <span
      className={`icon-material${className ? ` ${className}` : ''}`}
      {...props}
    >
      {name}
    </span>
  ) : (
    <span
      className={`fa fa-${name}${className ? ` ${className}` : ''}`}
      {...props}
    />
  )
Icon.displayName = 'Icon'

export default Icon
