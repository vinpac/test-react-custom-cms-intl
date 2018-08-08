import * as React from 'react'

interface ButtonProps {
  /** Buttons background color */
  color?: 'blue' | 'green'
  /** Buttons background color
   * @default "qwe"
   */
  text: string
  position: {
    x: number
    y: number
  }
}

const Button: React.SFC<ButtonProps> = props => (
  <div className="btn btn-primary">{props.color} = Home</div>
)

export default Button
