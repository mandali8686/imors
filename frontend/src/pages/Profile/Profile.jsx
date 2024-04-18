import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Container,
} from "react-bootstrap";
import "./Profile.css";

import { getThisUser } from "../../api/auth";
import { updateEmail, updateUsername, changePassword } from "../../api/user";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      const user = await getThisUser();
      setEmail(user.email);
      setUsername(user.username);
    }
    fetchUserData();
  }, []);

  const handleProfileChange = async (e) => {
    e.preventDefault();
    const results = await Promise.all([
      updateEmail(email),
      updateUsername(username),
      password
        ? changePassword(email, password)
        : Promise.resolve({ message: "No password change" }),
    ]);

    const errors = results
      .filter((res) => res.error !== "N/A")
      .map((res) => res.error);
    if (errors.length) {
      setErrors(errors);
    } else {
      setEditing(false); // Return to viewing mode after saving
    }
  };

  return (
    <div>
      <Container className="my-5">
        {editing ? (
          <Form onSubmit={handleProfileChange}>
            <h1>Edit Profile</h1>
            {errors.map((error, index) => (
              <div key={index} style={{ color: "red" }}>
                {error}
              </div>
            ))}
            <FormGroup className="mb-3">
              <FormLabel>Email</FormLabel>
              <FormControl
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "40%" }}
                required
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Username</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "40%" }}
                required
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "40%" }}
                required
              />
            </FormGroup>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        ) : (
          <div>
            <h1>Profile</h1>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Username:</strong> {username}
            </p>
            <Button variant="secondary" onClick={() => setEditing(true)}>
              Edit
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Profile;
