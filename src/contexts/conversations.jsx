import React, { createContext, useContext, useState } from "react";
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

export const ConversationsProvider = ({ children, id }) => {
  const [conversations, setConversation] = useLocalStorage("conversations", []);
  const [selectedConversation, setSelectedConversation] = useState(0);
  const { contacts } = useContacts();

  const createConversation = (recipients) => {
    setConversation((prevContacts) => [
      ...prevContacts,
      { recipients, messages: [] },
    ]);
  };

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((id) => {
      const recipient = contacts.find((contact) => id === contact.id);
      return {
        name: (recipient && recipient.name) || id,
        id,
      };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => contact.id === message.sender);
      const name = (contact && contact.name) || message.sender;
      const fromMe = message.sender === id;
      return { ...message, senderName: name, fromMe };
    });

    return {
      ...conversation,
      recipients,
      messages,
      selected: index === selectedConversation,
    };
  });

  const addMessageToConversation = ({ recipients, text, sender }) => {
    setConversation((prev) => {
      let madeChange = false;
      const newMessage = { sender, text };
      const newConversations = prev.map((conversation) => {
        if (arrayEquality(recipients, conversation.recipients)) {
          madeChange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }
        return conversation;
      });
      if (madeChange) {
        return newConversations;
      } else {
        return [...prev, { messages: [newMessage], recipients }];
      }
    });
  };
  const sendMessage = (recipients, text) => {
    console.log(recipients);
    console.log(text);
    addMessageToConversation({ recipients, text, sender: id });
  };

  const handleConversationSelect = (index) => setSelectedConversation(index);
  const contextData = {
    conversations: formattedConversations,
    activeConversation: formattedConversations[selectedConversation],
    createConversation,
    sendMessage,
    selectConversation: handleConversationSelect,
  };
  return (
    <ConversationsContext.Provider value={contextData}>
      {children}
    </ConversationsContext.Provider>
  );
};

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();
  return a.every((el, i) => el === b[i]);
}
