import React, { useEffect, useState } from "react";
import "../style/Form.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contextProvider/UserContext";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const dataToSend = { user: formData };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_WEBSOCKET_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const responseData = await response.json(); // Parse the response JSON
        localStorage.setItem("user", JSON.stringify(responseData)); // Store user data in local storage
        setUser(responseData); // Update user state
        navigate("/");
      }
    } catch (error) {
      // toast.danger("error in signup");
      console.error("Error updating post:", error);
    }
  };
  return (
    <div className="parent-container">
      <div className="form-container">
        <div className="form-content mt-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></input>

          <label htmlFor="password">New Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          ></input>

          <div className="mt-2 ">
            <button
              className="btn btn-secondary button-class"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
