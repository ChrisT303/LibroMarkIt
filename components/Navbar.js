import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { AiOutlineCloseCircle } from "react-icons/ai";

import Auth from "../server/utils/auth";

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const loggedIn = Auth.loggedIn();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navigate = (url) => {
    router.push(url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <header className="bg-[#3A3E59] text-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <button
              className="text-2xl font-semibold"
              onClick={() => navigate("/")}
            >
              LibroMarkit
            </button>
            <button
              className="md:hidden text-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <AiOutlineCloseCircle className="text-xl" />
              ) : (
                "☰"
              )}
            </button>
            <div
              className={`${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block md:flex md:items-center md:space-x-4`}
            >
              <ul className="flex items-center space-x-4">
                <li>
                  <button
                    className="hover:text-gray-300"
                    onClick={() => navigate("/")}
                  >
                    Search For Books
                  </button>
                </li>
                {loggedIn ? (
                  <>
                    <li>
                      <button
                        className="hover:text-gray-300"
                        onClick={() => navigate("/savedbooks")}
                      >
                        See Your Books
                      </button>
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

      <div className="relative z-50">
        <div
          className={`${
            showModal ? "block" : "hidden"
          } fixed z-40 inset-0 overflow-y-auto`}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="flex items-center justify-center min-h-screen"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowModal(false);
              }
            }}
          >
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
        {showModal && (
          <>
            <div
              className="fixed z-30 inset-0 bg-gray-500 opacity-75"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowModal(false);
                }
              }}
            ></div>
          </>
        )}
      </div>
    </>
  );
};

export default AppNavbar;
