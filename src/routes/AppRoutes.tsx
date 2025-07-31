import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

import Login from '../components/Login'
import Dashboard from '../pages/Dashboard'
import Admin from '../pages/Admin'
import ProtectedRoute from '../components/ProtectedRoute'

const AppRoutes: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <Routes>
      {/* Trang login */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard: chỉ cần login */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin: yêu cầu role admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <Admin />
          </ProtectedRoute>
        }
      />

      {/* Redirect mặc định */}
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
    </Routes>
  )
}

export default AppRoutes
