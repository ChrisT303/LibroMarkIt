import React from "react";
import Auth from "../server/utils/auth";
import Image from "next/image";

const FeaturedBooks = ({ featuredBooks, handleSaveBook, savedBookIds }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Featured Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredBooks.map((book) => {
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
                        ? "bg-[#ED6B5B] text-white"
                        : "bg-[#F9AC66] text-white"
                    }`}
                    onClick={() => handleSaveBook(book.bookId)}
                  >
                    {savedBookIds?.some(
                      (savedBookId) => savedBookId === book.bookId
                    )
                      ? "Book Saved!"
                      : "Save this Book!"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedBooks;
