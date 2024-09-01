import React, { useState, useEffect } from "react";
import "../style/Sidebar.css"; // Import CSS file for sidebar styles
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../contextProvider/UserContext";

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState("tab1"); // Default selected tab
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/anonymous-chat") {
      // If we're already on the "/anonymous-chat" page, refresh it
      window.location.reload();
    } else {
      // Otherwise, navigate to the "/anonymous-chat" page
      navigate("/anonymous-chat");
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const navigateToSignup = () => {
    console.log("clicked");
    navigate("/signup");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (user && selectedTab === "tab1") {
      fetchUsers();
    }
  }, [selectedTab, user]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:3000/users", {
        credentials: "include", // Ensure cookies are sent
      }); // Adjust the URL as needed
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setUsers(data); // Adjust based on your API response structure
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.clear();
        setUsers([]); // Update user state
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  if (!user) {
    return (
      <div className="sidebar">
        <div className="tabs">
          <button
            className={`tab-button ${selectedTab === "tab1" ? "active" : ""}`}
            onClick={navigateToSignup}
          >
            Sign Up
          </button>
          <button
            className={`tab-button ${selectedTab === "tab2" ? "active" : ""}`}
            onClick={navigateToLogin}
          >
            Login
          </button>
        </div>
        <div className="tabs">
          <button className={`tab-button`} onClick={handleClick}>
            Anonymous Chatting
          </button>
        </div>
        <div className="tab-content">
          {selectedTab === "tab1" && (
            <UserList users={users} loading={loading} error={error} />
          )}
          {selectedTab === "tab2" && <Settings />}
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="tabs">
        <button
          className={`tab-button ${selectedTab === "tab1" ? "active" : ""}`}
          onClick={() => handleTabChange("tab1")}
        >
          All Users
        </button>
        <button
          className={`tab-button ${selectedTab === "tab2" ? "active" : ""}`}
          onClick={() => handleTabChange("tab2")}
        >
          Conversations
        </button>
      </div>
      <div className="tabs">
        <button className={`tab-button`} onClick={handleClick}>
          Anonymous Chatting
        </button>
      </div>
      <div className="tab-content">
        {selectedTab === "tab1" && (
          <UserList users={users} loading={loading} error={error} />
        )}
        {selectedTab === "tab2" && <Settings />}
      </div>
      <button className={`tab-button`} onClick={handleLogout}>
        Log Out: <strong className="user-name">{user.name}</strong>
      </button>
    </div>
  );
};

// UserList Component
const UserList = ({ users, loading, error }) => {
  const navigate = useNavigate();
  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleClick = (user) => {
    navigate(`/inbox/${user.id}/${user.name}`);
  };

  return (
    <div>
      <h3>All User</h3>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} onClick={() => handleClick(user)}>
              {user.name}
            </li> // Adjust based on your user object
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>
    </div>
  );
};

// Placeholder Settings Component
const Settings = () => (
  <div>
    <h3>Conversations</h3>
    <p>Settings content goes here.</p>
  </div>
);

export default Sidebar;
