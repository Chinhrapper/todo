import React from 'react'
import { Layout, Menu, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'

const { Header, Content, Footer } = Layout

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
          📝 Todo Manager
        </div>
        <Menu theme="dark" mode="horizontal" style={{ flex: 1, marginLeft: 20 }}>
          <Menu.Item key="dashboard">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="admin">
            <Link to="/admin">Admin</Link>
          </Menu.Item>
        </Menu>
        <Button danger onClick={handleLogout}>
          Logout
        </Button>
      </Header>

      <Content style={{ padding: 24 }}>{children}</Content>

      <Footer style={{ textAlign: 'center' }}>©2025 Todo App with Redux</Footer>
    </Layout>
  )
}

export default MainLayout
