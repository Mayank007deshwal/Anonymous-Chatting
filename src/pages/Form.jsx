import React, { useState } from "react";
import "../style/Form.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contextProvider/UserContext";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
  });

  const { user, setUser } = useUser();

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const dataToSend = { user: formData };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
          credentials: "include",
        }
      );

      if (response.status === 201) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  return (
    <div className="parent-container">
      <div className="form-container">
        <div className="form-content mt-4">
          <label htmlFor="name">Enter Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          ></input>
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

          <div className="mt-3">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleChange}
            />
            <label className="form-check-label ml-10" htmlFor="male">
              Male
            </label>

            <input
              className="form-check-input ml-10"
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleChange}
            />
            <label className="form-check-label ml-10" htmlFor="female">
              Female
            </label>

            <input
              className="form-check-input ml-10"
              type="radio"
              name="gender"
              id="other"
              value="other"
              onChange={handleChange}
            />
            <label className="form-check-label ml-10" htmlFor="other">
              Other
            </label>
          </div>

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

export default Form;
