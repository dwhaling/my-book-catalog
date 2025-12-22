function CatalogGrid({ books, onDeleteBook, onToggleShelf }) {
  return (
    <div className="grid">
      {books.map((book, index) => (
        <div key={book.isbn ?? `${book.title}-${book.author}-${index}`} className="card">
          <div className="coverWrap">
            {book.coverUrl ? (
              <img className="cover" src={book.coverUrl} alt={`Cover of ${book.title}`} />
            ) : (
              <div className="coverPlaceholder">No cover</div>
            )}

            <button
              className="favoriteBtn"
              onClick={() => onToggleShelf(book, "favorites")}
              aria-label="Toggle favorite"
              title={book.favorite ? "Remove from favorites" : "Add to favorites"}
            >
              {book.shelves.includes("favorites") ? "★" : "☆"}
            </button>

            <button
              className="deleteBtn"
              onClick={() => onDeleteBook(index)}
              aria-label="Remove from catalog"
              title="Remove"
            >
              🗑️
            </button>
          </div>

          <div className="meta">
            <div className="title" title={book.title}>{book.title}</div>
            <div className="author" title={book.author}>{book.author}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CatalogGrid;
