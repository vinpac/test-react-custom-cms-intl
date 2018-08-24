import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 5px 8px;

  .input-group-text {
    padding: 0.1rem 0.2rem 0.2rem 0.5rem;
    height: 28px;
    background: #272527;
    border-width: 0;
    color: #fff;
  }
`

const Label = styled.label`
  color: #fff;
  font-size: 13px;
  display: block;
  margin: 6px 0 0;

  > .input {
    width: 14px;
    height: 14px;
    border-width: 0;
    box-shadow: none !important;
    background: #333;
    vertical-align: -1px;
    margin-right: 10px;

    &:checked {
      background-size: 10px;
    }
  }
`

interface ControlFormProps {
  readonly className?: string
  readonly label: string
  readonly optional?: boolean
  readonly checked?: boolean
  readonly children: React.ReactNode
  readonly onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ControlForm: React.SFC<ControlFormProps> = ({
  className,
  label,
  children,
  optional,
  checked,
  onChange,
}) => (
  <Container className={className}>
    <div className="row">
      <div className="col-4 pr-0">
        <Label htmlFor="" className="text-truncate">
          {optional ? (
            <input
              type="checkbox"
              className="input"
              checked={checked || false}
              onChange={onChange}
            />
          ) : null}
          {label}
        </Label>
      </div>
      <div className="col-8">{children}</div>
    </div>
  </Container>
)

ControlForm.displayName = 'ControlForm'
ControlForm.defaultProps = {
  className: undefined,
}

export default ControlForm
