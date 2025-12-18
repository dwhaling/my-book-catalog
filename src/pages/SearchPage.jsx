function SearchPage({
  searchQuery,
  searchResults,
  isSearching,
  onSearchQueryChange,
  onSearchSubmit,
  onAddBook,
}) {
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
        <ul>
          {searchResults.map((book, index) => (
            <li key={index} style={{ display: "flex", gap: "30px", alignItems: "center" }}>
                {book.coverUrl && (
                    <img
                    src={book.coverUrl}
                    alt={`Cover of ${book.title}`}
                    width="50"
                    />
                )}

                <div>
                    <div><strong>{book.title}</strong></div>
                    <div>{book.author}</div>
                </div>

                <button onClick={() => onAddBook(book)} disabled={false}>Add</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default SearchPage;
