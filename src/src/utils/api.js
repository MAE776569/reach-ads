import axios from "axios"

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
})

export const getCategories = () => api.get("/categories")
export const login = (body) => api.post("/auth/admin/login", body)
export const createCategory = (category) => api.post("/categories", category)
export const editCategory = (id, category) =>
  api.put(`/categories/${id}`, category)
export const deleteCategory = (id) => api.delete(`/categories/${id}`)
export const getUser = () => api.get("/user")

export default api
