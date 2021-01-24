import React, { useEffect } from "react"
import { Route, useHistory } from "react-router-dom"
import Categories from "./Categories"
import Login from "./Login"
import api from "../utils/api"
import { useToast } from "@chakra-ui/react"

function App() {
  const history = useHistory()
  const toast = useToast()

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => Promise.resolve(res),
      (error) => {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 403) {
            history.push("/login")
          } else if (error.response.status === 422) {
            const firstError = Object.keys(error.response.data.errors)[0]
            const firstErrorMessage = error.response.data.errors[firstError]
            toast({
              title: "Invalid data",
              description: `${firstError}: ${firstErrorMessage}`,
              status: "error",
              duration: 5000,
              isClosable: true,
            })
          } else if (error.response.status === 404) {
            toast({
              title: "Item not found",
              description: "The request item is not found",
              status: "error",
              duration: 5000,
              isClosable: true,
            })
          } else if (error.response.status === 500) {
            toast({
              title: "Internal server error",
              description: "Something went wrong",
              status: "error",
              duration: 5000,
              isClosable: true,
            })
          }
        } else {
          toast({
            title: "Network error",
            description: "Make sure you have a connection",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        }
        return Promise.reject(error)
      }
    )

    return () => {
      api.interceptors.response.eject(interceptor)
    }
  }, [])

  return (
    <>
      <Route exact path="/" component={Categories} />
      <Route path="/login" component={Login} />
    </>
  )
}

export default App
