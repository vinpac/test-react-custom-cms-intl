import * as React from 'react'
import { Carousel } from '~/components/Carousel'

interface EditorCarouselProps {
  readonly className?: string
  readonly rotateEach?: number
  readonly height: number
  readonly defaultItemId?: string
  readonly children: React.ReactNode
}

const EditorCarousel: React.SFC<EditorCarouselProps> = ({
  className,
  rotateEach,
  height,
  children,
  defaultItemId,
}) => (
  <Carousel
    className={className}
    rotateEach={rotateEach}
    defaultItemId={defaultItemId}
    style={{ height }}
  >
    {children}
  </Carousel>
)

EditorCarousel.displayName = 'EditorCarousel'
EditorCarousel.defaultProps = {
  className: undefined,
}

export default EditorCarousel
