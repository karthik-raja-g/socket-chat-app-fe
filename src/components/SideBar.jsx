import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import NewConversationModal from "./NewConversationModal";
import NewContactModal from "./NewContactModal";

const CONVERSATIONS_TAB = "conversations";
const CONTACTS_TAB = "contacts";
const SideBar = ({ id }) => {
  const [tab, setTab] = useState(CONVERSATIONS_TAB);
  const [modalOpen, setModalOpen] = useState(false)
  const isConversationOpen = tab === CONVERSATIONS_TAB;

  const closeModal = () => setModalOpen(false)
  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={tab} onSelect={setTab}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_TAB}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_TAB}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content
          className="overflow-auto flex-grow-1"
          style={{ borderRight: "1px solid #d9d9d9" }}
        >
          <Tab.Pane eventKey={CONVERSATIONS_TAB}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_TAB}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border">
          Your Id: <span className="text-secondary">{id}</span>
        </div>
        <Button className="rounded-0" onClick={() => setModalOpen(true)}>
          New {!isConversationOpen ? "Contact" : "Conversation"}
        </Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={closeModal}>
        {isConversationOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
};

export default SideBar;
