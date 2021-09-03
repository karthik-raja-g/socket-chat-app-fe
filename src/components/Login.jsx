import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 as getId } from "uuid";

const Login = ({ onSubmit }) => {
  const inputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputRef.current.value);
  };

  const createId = () => {
    onSubmit(getId());
  };
  return (
    <Container
      className="d-flex align-items-center "
      style={{ height: "100vh" }}
    >
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group className="pb-3">
          <Form.Label>Enter ID</Form.Label>
          <Form.Control type="text" ref={inputRef} />
        </Form.Group>
        <Button type="submit">Submit</Button>
        <Button onClick={createId} variant="secondary" className="mx-2">
          Create new ID
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
