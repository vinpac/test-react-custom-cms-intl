import * as React from 'react'
import Link from 'next/link'
import {
  ControlType,
  PropertyControls,
} from '~/components/ContentEditor/models/controls'
import { ComponentDescription } from '~/components/ContentEditor/types'

interface InternalLinkProps {
  readonly className?: string
  readonly href?: string | { pathname: string; query?: object }
  readonly as?: string
  readonly children?: React.ReactNode
}

const InternalLink: React.SFC<InternalLinkProps> &
  ComponentDescription<PropertyControls<InternalLinkProps>> = ({
  href,
  as: asURI,
  className,
  children,
}) => (
  <Link
    href={{ pathname: '/render', query: { slug: href } }}
    as={asURI || href}
  >
    <a className={className}>{children}</a>
  </Link>
)

InternalLink.displayName = 'InternalLink'
InternalLink.defaultProps = {
  className: undefined,
}
InternalLink.propertyControls = {
  href: {
    type: ControlType.String,
    label: 'Href',
    placeholder: 'Destino',
  },
  as: {
    type: ControlType.String,
    label: 'as',
    placeholder: 'Link',
  },
}

export default InternalLink
