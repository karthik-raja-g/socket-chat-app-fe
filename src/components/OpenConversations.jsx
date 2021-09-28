import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "../contexts/conversations";

const OpenConversations = () => {
  const [text, setText] = useState("");
  const { activeConversation, sendMessage } = useConversations()
  const handleSubmit = e => {
    e.preventDefault();
    console.log(activeConversation.recipients)

    sendMessage(activeConversation.recipients.map(r => r.id),text)
    setText('')
  }
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="d-flex flex-column flex-grow-1 overflow-auto"></div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none", borderRadius: 0 }}
            />
            <InputGroup.Append >
              <Button type="submit" className="h-100 rounded-0">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};

export default OpenConversations;
