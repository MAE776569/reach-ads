import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

export const getCategories = () => api.get("/categories")
export const login = (body) => api.post("/auth/login", body)
export const createCategory = (category) => api.post("/categories", category)
export const editCategory = (id, category) =>
  api.put(`/categories/${id}`, category)
export const deleteCategory = (id) => api.delete(`/categories/${id}`)
