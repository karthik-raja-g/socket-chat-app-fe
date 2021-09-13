import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

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
  const createConversation = (recipients) => {
    setConversation((prevContacts) => [...prevContacts, { recipients, messages: [] }]);
  };
  return (
    <ConversationsContext.Provider
      value={{ conversations, createConversation }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
