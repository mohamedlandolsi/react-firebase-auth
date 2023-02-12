import {
  Alert,
  AlertIcon,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out.");
    }
  }

  return (
    <Center>
      <Card mt={20} p={15}>
        <CardHeader>
          <Heading>Profile</Heading>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <Text>Email: {currentUser.email}</Text>
        </CardHeader>
        <CardBody>
          <Link to="/update-profile">
            <Button>Update Profile</Button>
          </Link>
        </CardBody>
        <CardFooter>
          <Button onClick={handleLogout}>Logout</Button>
        </CardFooter>
      </Card>
    </Center>
  );
}

export default Dashboard;
