import styled from 'styled-components'

export const Button = styled.button.attrs({ className: 'btn' })`
  background: #2c292d;
  border-color: #010101;
  color: #fff;
  font-size: 14px;
  padding-top: 6px;
  padding-bottom: 6px;
  transition: transform 0.1s;

  &:hover {
    background: #403d42;
  }

  &:active {
    transform: translateY(1px);
  }
`
