import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './app/store'

import Login from './components/Login'
import TodoApp from './components/TodoApp'
import ProtectedRoute from './components/ProtectedRoute'

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <TodoApp />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={token ? '/todos' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
