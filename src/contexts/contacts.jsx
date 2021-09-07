import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = createContext();

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error(`Context missing provider`);
  }
  return context;
};

export const ContactsProvider = ({children}) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const createContact = (id, name) => {
    setContacts((prevContacts) => [...prevContacts, { id, name }]);
  };
  return (
    <ContactsContext.Provider
      value={{ contacts, createContact }}
    >{children}</ContactsContext.Provider>
  );
};
