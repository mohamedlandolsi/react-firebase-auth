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

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to create an account.");
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
              <Heading as="h2">Sign Up</Heading>
            </Center>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" type="email" ref={emailRef} />
              <FormLabel mt="20px">Password</FormLabel>
              <Input placeholder="Password" type="password" ref={passwordRef} />
              <FormLabel mt="20px">Password Confirmation</FormLabel>
              <Input
                placeholder="Confirm Password"
                type="password"
                ref={passwordConfirmRef}
              />
              <Center>
                <Button
                  disabled={loading}
                  type="submit"
                  colorScheme="teal"
                  mt="30px"
                >
                  Sign Up
                </Button>
              </Center>
            </form>
          </CardBody>
          <Center>
            <CardFooter>
              <Text>
                Already have an account? <Link to="/login">Log in</Link>.
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

export default Signup;
