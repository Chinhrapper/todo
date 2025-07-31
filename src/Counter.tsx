import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from './app/store'
import { increment, decrement } from './features/counter/counterSlice'

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Tăng</button>
      <button onClick={() => dispatch(decrement())} style={{ marginLeft: 8 }}>
        Giảm
      </button>
    </div>
  )
}

export default Counter
