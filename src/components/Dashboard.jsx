import React from "react";
import SideBar from "./SideBar";

const Dashboard = ({ id }) => {
  return (
    <div style={{ height: "100vh" , backgroundColor: '#4a4a4a'}} className="d-flex">
      <SideBar id={id} />
    </div>
  );
};

export default Dashboard;
