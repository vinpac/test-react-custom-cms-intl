import React from 'react';

export type props = {
  text: string
}
const Menu = ({ text }: props) => <button>{text}</button>

export default Menu
