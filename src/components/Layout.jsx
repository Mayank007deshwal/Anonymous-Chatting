import React from "react";
import Sidebar from "./Sidebar"; // Adjust the import path as needed
import "../style/Layout.css"; // Import CSS file for layout styles

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="content">
        {children} {/* This is where the page content will be rendered */}
      </div>
    </div>
  );
};

export default Layout;
