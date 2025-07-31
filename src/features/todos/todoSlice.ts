import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getTodos, addTodoApi, updateTodoApi, deleteTodoApi } from '../../services/todoService'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoState {
  items: Todo[]
  loading: boolean
  error: string | null
}

const initialState: TodoState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchTodos = createAsyncThunk<Todo[]>('todos/fetchTodos', async () => {
  return await getTodos()
})

export const createTodo = createAsyncThunk<Todo, string>('todos/createTodo', async (text) => {
  return await addTodoApi(text)
})

export const removeTodo = createAsyncThunk<number, number>('todos/removeTodo', async (id) => {
  await deleteTodoApi(id)
  return id
})

export const patchTodo = createAsyncThunk<Todo, { id: number; data: Partial<Todo> }>(
  'todos/patchTodo',
  async ({ id, data }) => {
    return await updateTodoApi(id, data)
  }
)

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    completeTodos: (state, action: PayloadAction<number[]>) => {
      state.items.forEach((todo) => {
        if (action.payload.includes(todo.id)) todo.completed = true
      })
    },
    uncompleteTodos: (state, action: PayloadAction<number[]>) => {
      state.items.forEach((todo) => {
        if (action.payload.includes(todo.id)) todo.completed = false
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false
        state.error = 'Không thể tải todos'
      })

      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })

      .addCase(removeTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload)
      })

      .addCase(patchTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
  },
})

export const { completeTodos, uncompleteTodos } = todoSlice.actions
export default todoSlice.reducer
