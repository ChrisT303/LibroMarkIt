import React, { useState, useEffect } from "react";

import Auth from "../server/utils/auth";
import { searchGoogleBooks } from "../server/utils/api";
import { saveBookIds, getSavedBookIds } from "../server/utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../server/utils/mutations";
import Image from "next/image";

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ["No author to display"],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || "",
      }));

      setSearchedBooks(bookData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      const response = await saveBook({
        variables: {
          input: bookToSave,
        },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1>Search for Books!</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-wrap">
              <div className="w-full md:w-2/3 mb-2 md:mb-0">
                <input
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Search for a book"
                />
              </div>
              <div className="w-full md:w-1/3">
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 mt-2 md:mt-0 md:ml-2 rounded"
                >
                  Submit Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : "Search for a book to begin"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchedBooks.map((book) => {
            return (
              <div
                key={book.bookId}
                className="border border-gray-700 p-4 rounded"
              >
                {book.image ? (
                  <Image
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    className="w-full h-48 object-cover rounded-t"
                    width={150} 
                    height={200} 
                  />
                ) : null}
                <div className="mt-4">
                  <h3 className="text-lg font-bold">{book.title}</h3>
                  <p className="text-xs">Authors: {book.authors}</p>
                  <p className="text-sm mt-2">{book.description}</p>
                  {Auth.loggedIn() && (
                    <button
                      disabled={savedBookIds?.some(
                        (savedBookId) => savedBookId === book.bookId
                      )}
                      className={`w-full py-2 mt-4 rounded ${
                        savedBookIds?.some(
                          (savedBookId) => savedBookId === book.bookId
                        )
                          ? "bg-blue-500 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                      onClick={() => handleSaveBook(book.bookId)}
                    >
                      {savedBookIds?.some(
                        (savedBookId) => savedBookId === book.bookId
                      )
                        ? "This book has already been saved!"
                        : "Save this Book!"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchBooks;
