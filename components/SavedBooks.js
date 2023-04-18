import React from "react";
import { useQuery, useMutation } from "@apollo/client";

import { GET_ME } from "../server/utils/queries";
import Auth from "../server/utils/auth";
import { removeBookId, saveBookIds } from "../server/utils/localStorage";
import { REMOVE_BOOK } from "../server/utils/mutations";
import Image from "next/image";

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || [];

  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await removeBook({
        variables: { bookId },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }

      removeBookId(bookId);
      router.push("/savedbooks");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const savedBookIds = userData.savedBooks.map((book) => book.bookId);
  saveBookIds(savedBookIds);

  return (
    <>
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-3xl">Your Saved Books</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "No Books Saved Yet"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userData.savedBooks.map((book) => {
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
                  <button
                    className="w-full bg-red-600 text-white py-2 mt-4 rounded"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete Book
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SavedBooks;
