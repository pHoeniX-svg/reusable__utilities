import * as React from 'react'
import ReactDOM from 'react-dom'

type Action = {type: 'increment'} | {type: 'decrement'}
type Dispatch = (action: Action) => void
type State = {count: number}
type CountProviderProps = {children: React.ReactNode}

const CountStateContext = React.createContext<
  {state: State; dispatch: Dispatch} | undefined
>(undefined)

function countReducer(state: State, action: Action) {
  switch (action.type) {
    case 'increment': {
      return {count: state.count + 1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function CountProvider({children}: CountProviderProps) {
  const [state, dispatch] = React.useReducer(countReducer, {count: 0})
//   NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
   const value = React.useMemo(() => [state, dispatch], [state])
  return (
    <CountStateContext.Provider value={value}>
      {children}
    </CountStateContext.Provider>
  )
}

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`)
  }
  const [state, dispatch] = context

  const increment = () => dispatch({type: 'INCREMENT'})
  return {
    state,
    dispatch,
    increment,
  }
}

function Counter() {
  const {
    state: {count},
    increment,
  } = useCount()
  return <button onClick={increment}>{count}</button>
}

function CountDisplay() {
  const {
    state: {count},
  } = useCount()
  return <div>The current counter count is {count}</div>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
