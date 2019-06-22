// Building the toggle component

import React, { useState } from 'react'
// 🐨 uncomment this import to get the switch component.
// It takes an `onClick` and an `on` prop
import { Switch } from '../switch'

const Toggle = ({ onToggle }) => {
  const [on, setOn] = useState(false)

  const handleClick = () => {
    const newOn = !on
    onToggle(newOn)
    setOn(newOn)
  }

  return <Switch onClick={handleClick} on={on} />
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage ({
  onToggle = (...args) => console.log('onToggle', ...args)
}) {
  return <Toggle onToggle={onToggle} />
}
Usage.title = 'Build Toggle'

export { Toggle, Usage as default }
