import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/contacts";

const NewConversationModal = ({ closeModal }) => {
  const { contacts } = useContacts();
  const [selectedIds, setSelectedIds] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    closeModal();
  };

  const handleChange = (contactId) => {
    setSelectedIds((prevIds) => {
      if (prevIds.includes(contactId)) {
        return selectedIds.filter((id) => id !== contactId);
      }
      return [...prevIds, contactId];
    });
  };
  return (
    <>
      <Modal.Header closeButton closeLabel="">
        Create conversation
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
