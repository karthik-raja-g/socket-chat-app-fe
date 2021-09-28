import React from "react";
import SideBar from "./SideBar";
import { useConversations } from "../contexts/conversations";
import OpenConversations from "./OpenConversations";

const Dashboard = ({ id }) => {
  const { activeConversation } = useConversations();
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex bg-secondaryd"
    >
      <SideBar id={id} />
      {activeConversation && <OpenConversations />}
    </div>
  );
};

export default Dashboard;
