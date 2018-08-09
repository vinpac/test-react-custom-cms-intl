import * as React from 'react'
import Link from 'next/link'

interface InternalLinkProps {
  readonly className?: string
  readonly href?: string | { pathname: string; query?: object }
  readonly as?: string
  readonly children?: React.ReactNode
}

const InternalLink: React.SFC<InternalLinkProps> = ({
  href,
  as: asURI,
  className,
  children,
}) => (
  <Link href={href} as={asURI || href}>
    <a className={className}>{children}</a>
  </Link>
)

InternalLink.displayName = 'InternalLink'
InternalLink.defaultProps = {
  className: undefined,
}

export default InternalLink
