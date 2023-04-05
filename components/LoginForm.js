// see SignupForm.js for comments
import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN_USER } from "../server/utils/mutations";
import Auth from "../server/utils/auth";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
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
      <form className="w-full" noValidate onSubmit={handleFormSubmit}>
        {showAlert && (
          <div
            className="bg-red-500 text-white px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">
              Something went wrong with your login credentials!
            </span>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setShowAlert(false)}
            >
              <svg
                className="fill-current h-6 w-6 text-white"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block text-sm font-bold text-gray-700"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <div className="text-xs text-red-600">Email is required!</div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="password"
            className="block text-sm font-bold text-gray-700"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <div className="text-xs text-red-600">Password is required!</div>
        </div>
        <button
          className={`mt-4 ${
            !(userFormData.email && userFormData.password)
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-700"
          } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginForm;
