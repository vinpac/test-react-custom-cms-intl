import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import {
  CarouselProps,
  CarouselItemProps,
  CarouselIndicators,
  Carousel as RawCarousel,
  CarouselItem as RawCarouselItem,
} from '~/components/Carousel'

const Carousel = styled<CarouselProps>(RawCarousel)`
  height: 500px;
  border-radius: 4px;
  overflow: hidden;
`

const CarouselItem = styled<CarouselItemProps & { background: string }>(
  RawCarouselItem,
)`
  background: ${props => props.background};
  font-size: 64px;
  text-align: center;
  padding: 180px 0;
`

storiesOf('Carousel', module).add(
  'Default',
  withInfo()(() => (
    <Carousel rotateEach={5000} onChange={action('change')}>
      <CarouselItem id="qwe" background="#777">
        First slide
      </CarouselItem>
      <CarouselItem id="12" background="#900">
        Second slide
      </CarouselItem>
      <CarouselItem id="13" background="#030">
        Third slide
      </CarouselItem>
      <CarouselItem id="14" background="#018">
        Fourth slide
      </CarouselItem>
      <CarouselIndicators />
    </Carousel>
  )),
)
