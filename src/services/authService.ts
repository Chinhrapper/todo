import axios from 'axios'

const API_URL = 'https://dummyjson.com/todos'

export const login = async (username: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { username, password })
  return res.data
}
