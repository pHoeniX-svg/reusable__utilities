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
  const value = React.useMemo(() => [count, setCount], [count])
  return (
    <CountStateContext.Provider value={value}>
      {children}
    </CountStateContext.Provider>
  )
}

function useCount() {
  const context = React.useContext(CountStateContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

function CountDisplay() {
  const {
    state: {count},
  } = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const {dispatch} = useCount()
  return (
    <button onClick={() => dispatch({type: 'increment'})}>
      Increment count
    </button>
  )
}
    
function App() {
  return (
    <CountProvider>
      <CountDisplay />
      <Counter />
    </CountProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
