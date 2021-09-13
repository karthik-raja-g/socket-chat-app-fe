import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/contacts";
import { useConversations } from "../contexts/conversations";

const NewConversationModal = ({ closeModal }) => {
  const { contacts } = useContacts();
  const [selectedIds, setSelectedIds] = useState([]);
  const { createConversation } = useConversations();
  const submitHandler = (e) => {
    e.preventDefault();
    selectedIds.length && createConversation(selectedIds);
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
        <Form
          onSubmit={submitHandler}
          id="dummy"
          className="d-flex flex-column flex-wrap "
          style={{ maxHeight: "200px" }}
        >
          {contacts.map((contact) => (
            <Form.Group
              controlId={contact.id}
              key={contact.id}
              className="my-2"
            >
              <Form.Check
                type="checkbox"
                value={selectedIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleChange(contact.id)}
              />
            </Form.Group>
          ))}
        </Form>
        <Button type="submit" form="dummy">
          Submit
        </Button>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
