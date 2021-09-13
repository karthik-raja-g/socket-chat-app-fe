import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/conversations";

const Conversations = () => {
  const { conversations } = useConversations();
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item key={index}>
          {conversation.recipients.map(({ name }) => name).join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Conversations;
