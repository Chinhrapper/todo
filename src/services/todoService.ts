import API from './api'
import { Todo } from '../features/todos/todoSlice'

export const getTodos = async () => {
  const res = await API.get<Todo[]>('/todos')
  return res.data
}

export const addTodoApi = async (text: string) => {
  const res = await API.post<Todo>('/todos', { text, completed: false })
  return res.data
}

export const updateTodoApi = async (id: number, data: Partial<Todo>) => {
  const res = await API.patch<Todo>(`/todos/${id}`, data)
  return res.data
}

export const deleteTodoApi = async (id: number) => {
  await API.delete(`/todos/${id}`)
  return id
}
