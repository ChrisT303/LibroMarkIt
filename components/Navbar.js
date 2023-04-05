import React, { useState } from "react";
import Link from "next/link";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { useRouter } from 'next/router';


import Auth from "../utils/auth";

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const router = useRouter();


  return (
    <>
      <header className="bg-gray-900 text-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold">
              Google Books Search
            </Link>
            <div className="hidden md:block">
              <ul className="flex items-center space-x-4">
                <li>
                  <Link href="/" className="hover:text-gray-300">
                    Search For Books
                  </Link>
                </li>
                {Auth.loggedIn() ? (
                  <>
                    <li>
                      <Link href="/saved" className="hover:text-gray-300">
                        See Your Books
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={Auth.logout}
                        className="hover:text-gray-300"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <button
                      onClick={() => setShowModal(true)}
                      className="hover:text-gray-300"
                    >
                      Login/Sign Up
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <div
        className={`${
          showModal ? "fixed" : "hidden"
        } z-10 inset-0 overflow-y-auto`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen">
          <div className="w-full max-w-2xl mt-10 bg-white rounded-lg px-8 py-6">
            <div className="w-full">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex">
                  <button
                    className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === "login"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("login")}
                  >
                    Login
                  </button>
                  <button
                    className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === "signup"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("signup")}
                  >
                    Sign Up
                  </button>
                </nav>
              </div>
              <div className="mt-6">
                {activeTab === "login" ? (
                  <LoginForm handleModalClose={() => setShowModal(false)} />
                ) : (
                  <SignUpForm handleModalClose={() => setShowModal(false)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppNavbar;
