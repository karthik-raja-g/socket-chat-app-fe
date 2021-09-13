import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./contacts";

const ConversationsContext = createContext();

export const useConversations = () => {
  const context = useContext(ConversationsContext);
  if (context === undefined) {
    throw new Error(`Context missing provider`);
  }
  return context;
};

export const ConversationsProvider = ({ children }) => {
  const [conversations, setConversation] = useLocalStorage("conversations", []);
  const { contacts } = useContacts();

  const createConversation = (recipients) => {
    setConversation((prevContacts) => [
      ...prevContacts,
      { recipients, messages: [] },
    ]);
  };

  const formattedConversations = conversations.map((conversation) => {
    const recipients = conversation.recipients.map((id) => {
      const recipient = contacts.find((contact) => id === contact.id);
      return {
        name: (recipient && recipient.name) || id,
        id,
      };
    });
    return { ...conversation, recipients };
  });

  const contextData = {
    conversations: formattedConversations,
    createConversation,
  };
  return (
    <ConversationsContext.Provider value={contextData}>
      {children}
    </ConversationsContext.Provider>
  );
};
