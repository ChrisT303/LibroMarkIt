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
                  className="w-full p-2 border border-gray-300 rounded text-black"
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
        {searchedBooks.length === 0 ? (
          <FeaturedBooks featuredBooks={featuredBooks} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchedBooks.map((book) => {
              // ... (rest of your JSX code for rendering books)
            })}
          </div>
        )}
      </div>
    </>
  );
  