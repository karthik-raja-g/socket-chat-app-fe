import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/conversations";

const Conversations = () => {
  const { conversations, selectConversation } = useConversations();
  console.log(conversations, 'cons')
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          active={conversation.selected}
          onClick={() => selectConversation(index)}
          action
        >
          {conversation.recipients.map(({ name }) => name).join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Conversations;
