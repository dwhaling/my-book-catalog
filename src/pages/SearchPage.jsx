import { useState } from "react";

function SearchPage({
  searchQuery,
  searchResults,
  isSearching,
  onSearchQueryChange,
  onSearchSubmit,
  onAddBook,
  isBookInCatalog,
}) {
  const [addedIndex, setAddedIndex] = useState(null);

  return (
    <>
      <h1>Search Books</h1>

      <form onSubmit={onSearchSubmit}>
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchQuery}
          onChange={onSearchQueryChange}
        />
        <button>Search</button>
      </form>

      {isSearching && <p>Searching...</p>}

      {searchResults.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {searchResults.map((book, index) => {
            const alreadyAdded = isBookInCatalog(book);

            return (
              <li
                key={index}
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  marginBottom: "12px",
                  opacity: alreadyAdded ? 0.6 : 1,
                }}
              >
                {book.coverUrl && (
                  <img
                    src={book.coverUrl}
                    alt={`Cover of ${book.title}`}
                    width="50"
                  />
                )}

                <div style={{ flex: 1 }}>
                  <div>
                    <strong>{book.title}</strong>
                  </div>
                  <div>{book.author}</div>
                  {book.isbn && (
                    <div style={{ fontSize: "0.8em", color: "#666" }}>
                      ISBN: {book.isbn}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    onAddBook(book);
                    setAddedIndex(index);

                    setTimeout(() => {
                      setAddedIndex(null);
                    }, 1500);
                  }}
                  disabled={alreadyAdded || addedIndex === index}
                  style={{
                    cursor: alreadyAdded
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  {alreadyAdded
                    ? "Already added"
                    : addedIndex === index
                    ? "Added ✓"
                    : "Add"}
                </button>
              </li>
            );
          })}
        </ul>

      )}
    </>
  );
}

export default SearchPage;
