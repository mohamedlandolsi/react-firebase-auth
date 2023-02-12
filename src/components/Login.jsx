import {
  Alert,
  AlertIcon,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to sign in.");
    }

    setLoading(false);

    signup(emailRef.current.value, passwordRef.current.value);
  }

  return (
    <Center>
      <VStack>
        <Card mt="50px" p="25px" width="30rem">
          <CardHeader>
            <Center>
              <Heading as="h2">Log In</Heading>
            </Center>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" type="email" ref={emailRef} />
              <FormLabel mt="20px">Password</FormLabel>
              <Input placeholder="Password" type="password" ref={passwordRef} />
              <Center>
                <Button
                  disabled={loading}
                  type="submit"
                  colorScheme="teal"
                  mt="30px"
                  mb="20px"
                >
                  Log In
                </Button>
              </Center>
            </form>
            <Center>
              <Link to="/forgot-password">
                <Text>Forgot Password?</Text>
              </Link>
            </Center>
          </CardBody>
          <Center>
            <CardFooter>
              <Text>
                Need an account? <Link to="/signup">Sign up</Link>.
              </Text>
            </CardFooter>
          </Center>
        </Card>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
      </VStack>
    </Center>
  );
}

export default Login;
