import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_USER } from "../server/utils/mutations";
import Auth from "../server/utils/auth";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [usernameError, setUsernameError] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUsernameError(value.trim().length === 0);
    }

    setUserFormData({ ...userFormData, [name]: value });

    if (name === "email") {
      setEmailValid(
        value.trim().length > 0 && value.includes("@") && value.includes(".")
      );
    } else if (name === "password") {
      setPasswordValid(value.trim().length > 0);
    } else if (name === "username" && value.trim().length > 0) {
      setUsernameError(false);
    }
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
      <form className="needs-validation" onSubmit={handleFormSubmit}>
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
          {usernameError && (
            <div className="text-xs text-red-600">Username is required!</div>
          )}
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
          {!emailValid && (
            <div className="text-xs text-red-600">
              Please enter a valid email address!
            </div>
          )}
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
          {!passwordValid && (
            <div className="text-xs text-red-600">Password is required!</div>
          )}
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

export default SignupForm;
