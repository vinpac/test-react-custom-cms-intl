import * as React from 'react'
import styled from 'styled-components'
import isEqual from 'fast-deep-equal'
import { keyframes } from 'styled-components'

export const fadeUp = keyframes`
  0% {
    opacity: 0;
    top: -30px;
  }

  100% {
    top: 0;
    opacity: 1;
  }
`

export const Transition = {
  FadeUp: 'fade-up',
}
type TransitionType = 'fade-up'

const Body = styled.div``
const Container = styled.div`
  transition: height 400ms ease-in-out;

  &.transitioning {
    overflow: hidden;
  }

  &.transition-fade-up {
    &.transitioning ${Body} {
      position: relative;
    }

    ${Body} {
      animation: ${fadeUp} 300ms ease-in-out 0s 1 normal;
    }
  }
`

export interface RouterSwitchContextType {
  location: Location
  push?: (newLocation: Location) => void
}

export const RouterSwitchContext = React.createContext<RouterSwitchContextType>(
  {
    location: { path: '/' },
  },
)

interface Route<T> {
  path: string
  component: React.ComponentType<T>
  props?: Partial<T>
}

export interface Location {
  path: string
  props?: object
}

interface RouterSwitchProps {
  readonly routes: Route<any>[]
  readonly location?: Location
  readonly defaultPath?: string
  readonly onLocationChange?: (newLocation: Location) => void
  readonly className?: string
  readonly transition?: TransitionType
  readonly transitionTime?: number
}

interface RouterSwitchState {
  readonly location: Location
  readonly history: Location[]
  readonly offsetHeight?: number
  readonly transitioning?: boolean
}

class RouterSwitch extends React.Component<
  RouterSwitchProps,
  RouterSwitchState
> {
  transitionTimeout?: number
  body: HTMLDivElement

  static defaultProps = {
    transitionTime: 400,
    className: undefined,
  }
  static getDerivedStateFromProps(
    props: RouterSwitchProps,
    state?: RouterSwitchState,
  ): RouterSwitchState {
    let location = state ? state.location : { path: props.defaultPath || '/' }
    const history = state ? state.history : []
    if (state && props.location && !isEqual(location, props.location)) {
      history.push(props.location)
      location = props.location
    }

    return {
      location,
      history,
    }
  }

  constructor(props) {
    super(props)

    this.state = RouterSwitch.getDerivedStateFromProps(props)
  }

  componentDidMount() {
    this.setState({ offsetHeight: this.body.offsetHeight })
  }

  componentDidUpdate(_, prevState: RouterSwitchState) {
    const { transition, transitionTime } = this.props
    const { transitioning } = this.state

    if (
      transitioning &&
      transition &&
      prevState.location !== this.state.location
    ) {
      clearTimeout(this.transitionTimeout)

      this.setState({ offsetHeight: this.body.offsetHeight }, () => {
        this.transitionTimeout = window.setTimeout(() => {
          this.setState({
            transitioning: false,
          })
        }, transitionTime)
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.transitionTimeout)
  }

  push = (location: Location): void => {
    const { transition, location: fixedLocation, onLocationChange } = this.props
    const { history } = this.state

    if (onLocationChange) {
      onLocationChange(location)
    }

    if (!fixedLocation) {
      this.setState({
        location,
        transitioning: !!transition,
        history: [...history, location],
      })
    }
  }

  back = () => {
    const { location: fixedLocation, onLocationChange } = this.props
    const { history } = this.state
    const location = history.pop()

    if (location) {
      if (onLocationChange) {
        onLocationChange(location)
      }

      if (!fixedLocation) {
        this.setState({ location, history: [...history] })
      }
    }
  }

  render() {
    const { className, transition, routes } = this.props
    const { location, transitioning, offsetHeight } = this.state

    return (
      <RouterSwitchContext.Provider
        value={{
          location,
          push: this.push,
        }}
      >
        <Container
          className={`${className ? `${className} ` : ''}${
            transition ? `transition-${transition}` : ''
          }${transitioning ? ` transitioning` : ''}`}
          style={transitioning ? { height: `${offsetHeight}px` } : undefined}
        >
          <Body
            key={location.path}
            innerRef={ref => {
              this.body = ref
            }}
          >
            {routes.map(
              (route, i) =>
                route.path === location.path ? (
                  <route.component
                    key={`${route.path}${i}`}
                    {...location.props}
                  />
                ) : null,
            )}
          </Body>
        </Container>
      </RouterSwitchContext.Provider>
    )
  }
}

export default RouterSwitch
