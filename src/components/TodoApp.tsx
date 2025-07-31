import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../app/store'

import {
  fetchTodos,
  createTodo,
  removeTodo,
  patchTodo,
  Todo,
} from '../features/todos/todoSlice'

import { Card, Input, Button, List, Typography, Spin } from 'antd'

const { Text } = Typography

const TodoApp: React.FC = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  const { items: todos, loading } = useSelector((state: RootState) => state.todos)

  // 🔹 Lấy dữ liệu từ API khi component mount
  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  // 🔹 Thêm todo
  const handleAdd = () => {
    if (text.trim()) {
      dispatch(createTodo(text))
      setText('')
    }
  }

  // 🔹 Toggle completed
  const handleToggle = (todo: Todo) => {
    dispatch(patchTodo({ id: todo.id, data: { completed: !todo.completed } }))
  }

  // 🔹 Xóa todo
  const handleDelete = (id: number) => {
    dispatch(removeTodo(id))
  }

  return (
    <Card
      title="📝 Todo List"
      style={{ maxWidth: 500, margin: '40px auto', borderRadius: 12 }}
    >
      {/* Nhập Todo */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập công việc..."
          onPressEnter={handleAdd}
        />
        <Button type="primary" onClick={handleAdd}>
          Thêm
        </Button>
      </div>

      {/* Loading */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 20 }}>
          <Spin tip="Đang tải..." />
        </div>
      ) : (
        <List
          bordered
          dataSource={todos}
          renderItem={(todo) => (
            <List.Item
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                onClick={() => handleToggle(todo)}
                style={{
                  cursor: 'pointer',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#999' : '#000',
                }}
              >
                {todo.text}
              </Text>
              <Button danger size="small" onClick={() => handleDelete(todo.id)}>
                X
              </Button>
            </List.Item>
          )}
        />
      )}
    </Card>
  )
}

export default TodoApp
