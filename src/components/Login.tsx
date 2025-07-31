// src/components/Login.tsx
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../app/store'
import { loginThunk } from '../features/auth/authSlice'
import { Button, Input, Card, Typography, Alert, Spin } from 'antd'

const { Title } = Typography

const Login: React.FC = () => {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('123456')
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, token } = useSelector((state: RootState) => state.auth)

  const handleLogin = () => {
    if (!username || !password) return
    dispatch(loginThunk({ username, password }))
  }

  return (
    <Card style={{ maxWidth: 400, margin: '80px auto', textAlign: 'center' }}>
      <Title level={3}>Đăng nhập</Title>

      <Input
        placeholder="Tên đăng nhập"
        style={{ marginBottom: 16 }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input.Password
        placeholder="Mật khẩu"
        style={{ marginBottom: 16 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}
      {loading ? (
        <Spin />
      ) : (
        <Button type="primary" onClick={handleLogin} block>
          Đăng nhập
        </Button>
      )}

      {token && <Alert type="success" message="Đăng nhập thành công!" style={{ marginTop: 16 }} />}
    </Card>
  )
}

export default Login
