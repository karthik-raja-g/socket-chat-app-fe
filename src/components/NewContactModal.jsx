import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/contacts";

const NewContactModal = ({ closeModal }) => {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();
  const submitHandler = (e) => {
    e.preventDefault();
    createContact(idRef.current.value, nameRef.current.value);
    closeModal()
  };
  return (
    <>
      <Modal.Header closeButton closeLabel="">
        Create contact
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" required ref={idRef} />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Contact name</Form.Label>
            <Form.Control type="text" required ref={nameRef} />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewContactModal;
