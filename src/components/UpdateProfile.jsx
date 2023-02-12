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

function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.");
    }

    const promises = [];

    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account.");
      })
      .finally(() => {
        setLoading(false);
      });

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
  }

  return (
    <Center>
      <VStack>
        <Card mt="50px" p="25px" width="30rem">
          <CardHeader>
            <Center>
              <Heading as="h2">Update Profile</Heading>
            </Center>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
              />
              <FormLabel mt="20px">Password</FormLabel>
              <Input
                placeholder="Leave blank to keep the same"
                type="password"
                ref={passwordRef}
              />
              <FormLabel mt="20px">Password Confirmation</FormLabel>
              <Input
                placeholder="Leave blank to keep the same"
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
                  Update
                </Button>
              </Center>
            </form>
          </CardBody>
          <Center>
            <CardFooter>
              <Text>
                <Link to="/">Cancel</Link>
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

export default UpdateProfile;
