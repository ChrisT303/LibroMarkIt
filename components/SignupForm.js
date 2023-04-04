import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };


  return (
    <>
      <form
        className="needs-validation"
        noValidate
        onSubmit={handleFormSubmit}
      >
        {showAlert && (
          <div
            className="bg-red-500 text-white p-4 mb-4 rounded flex items-center justify-between"
            role="alert"
          >
            <span>Something went wrong with your signup!</span>
            <button
              type="button"
              className="text-white"
              onClick={() => setShowAlert(false)}
            >
              &times;
            </button>
          </div>
        )}
  
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="Your username"
            name="username"
            id="username"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <div className="invalid-feedback">Username is required!</div>
        </div>
  
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Your email address"
            name="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <div className="invalid-feedback">Email is required!</div>
        </div>
  
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <div className="invalid-feedback">Password is required!</div>
        </div>
        <button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </>
  );
  

};

export default SignupForm