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
