// Compound Components

import React, { useState, createContext, useEffect, useContext, useMemo, useCallback } from 'react'
import { Switch } from '../switch'

const ToggleContext = createContext()

const skipX = x => {
  let counter = 0
  return cb => {
    if (counter < x) {
      counter++
    } else {
      cb()
    }
  }
}

const skipOnce = skipX(1)

const Toggle = ({ onToggle, children }) => {
  const [on, setOn] = useState(false)
  const toggle = useCallback(() => { setOn(oldOn => !oldOn) }, [])

  useEffect(() => {
    skipOnce(() => onToggle(on))
  }, [on])

  const value = useMemo(() => ({ on, toggle }), [on])

  return <ToggleContext.Provider value={value}>
    {children}
  </ToggleContext.Provider>
}

const useToggleContext = () => {
  const context = useContext(ToggleContext)
  if (!context) {
    throw new Error('Toggle compound component cannot be rendered outside of the Toggle component.')
  }
  return context
}

const ToggleOn = ({ children }) => {
  const { on } = useToggleContext()
  return on ? children : null
}

const ToggleOff = ({ children }) => {
  const { on } = useToggleContext()
  return on ? null : children
}

const ToggleButton = props => {
  const { on, toggle } = useToggleContext()
  const handleClick = () => {
    toggle()
  }
  return <Switch onClick={handleClick} on={on} {...props} />
}

// class Toggle_old extends React.Component {
//   // you can create function components as static properties!
//   // for example:
//   // static Candy = (props) => <div>CANDY! {props.children}</div>
//   // Then that could be used like: <Toggle.Candy />
//   // This is handy because it makes the relationship between the
//   // parent Toggle component and the child Candy component more explicit
//   // 🐨 You'll need to create three such components here: On, Off, and Button
//   //    The button will be responsible for rendering the <Switch /> (with the right props)
//   // 💰 Combined with changes you'll make in the `render` method, these should
//   //    be able to accept `on`, `toggle`, and `children` as props.
//   //    Note that they will _not_ have access to Toggle instance properties
//   //    like `this.state.on` or `this.toggle`.
//   state = { on: false }
//   toggle = () =>
//     this.setState(
//       ({ on }) => ({ on: !on }),
//       () => this.props.onToggle(this.state.on),
//     )
//   render() {
//     // we're trying to let people render the components they want within the Toggle component.
//     // But the On, Off, and Button components will need access to the internal `on` state as
//     // well as the internal `toggle` function for them to work properly. So here we can
//     // take all this.props.children and make a copy of them that has those props.
//     //
//     // To do this, you can use:
//     // 1. React.Children.map: https://reactjs.org/docs/react-api.html#reactchildrenmap
//     // 2. React.cloneElement: https://reactjs.org/docs/react-api.html#cloneelement
//     //
//     // 🐨 you'll want to completely replace the code below with the above logic.
//     const { on } = this.state
//     return <Switch on={on} onClick={this.toggle} />
//   }
// }

// 💯 Support rendering non-Toggle components within Toggle without incurring warnings in the console.
// for example, try to render a <span>Hello</span> inside <Toggle />

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args)
}) {
  return (
    <Toggle onToggle={onToggle}>
      <ToggleOn>The button is on</ToggleOn>
      <ToggleOff>The button is off</ToggleOff>
      <ToggleButton />
    </Toggle>
  )
}
Usage.title = 'Compound Components'

export { Toggle, Usage as default }
