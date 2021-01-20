import React, { useState } from "react"
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  InputGroup,
  InputRightElement,
  Icon,
  Container,
} from "@chakra-ui/react"
import { login } from "../utils/api"
import ErrorMessage from "../components/ErrorMessage"
import { useHistory } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      await login({ email, password })
      setIsLoading(false)
      setShowPassword(false)
      history.push("/")
    } catch (error) {
      setError("Invalid username or password")
      setIsLoading(false)
      setEmail("")
      setPassword("")
      setShowPassword(false)
    }
  }

  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <Container pt={5} pb={5}>
      <Flex width="full" align="center" justifyContent="center" pt={5}>
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg">
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              {error && <ErrorMessage message={error} />}
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="email@provider.com"
                  size="lg"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="*******"
                    size="lg"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.5rem"
                      size="sm"
                      onClick={handlePasswordVisibility}>
                      {showPassword ? (
                        <Icon name="view-off" />
                      ) : (
                        <Icon name="view" />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                variantColor="teal"
                variant="outline"
                type="submit"
                width="full"
                mt={4}>
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </Container>
  )
}

export default Login
