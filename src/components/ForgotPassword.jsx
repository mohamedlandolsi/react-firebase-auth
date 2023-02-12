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
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions.");
    } catch {
      setError("Failed to reset password.");
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
              <Center>
                <Button
                  disabled={loading}
                  type="submit"
                  colorScheme="teal"
                  mt="30px"
                  mb="20px"
                >
                  Reset Password
                </Button>
              </Center>
            </form>
            <Center>
              <Link to="/login">
                <Text>Login</Text>
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
        {message && (
          <Alert status="success">
            <AlertIcon />
            {message}
          </Alert>
        )}
      </VStack>
    </Center>
  );
}

export default ForgotPassword;
