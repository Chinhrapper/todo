import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api';

interface AuthState {
  user: { username: string; role: string } | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
}

interface LoginPayload {
  username: string
  password: string
}

const DEFAULT_USER = {
  username: 'admin',
  password: '123456',
  role: 'admin',
}

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ username, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await api.post('/login', { username, password })
      localStorage.setItem('token', response.data.token)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Đăng nhập thất bại!')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
