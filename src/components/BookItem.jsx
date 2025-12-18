function BookItem({ book, onDelete }) {
  return (
    <li style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      {book.coverUrl && (
        <img
          src={book.coverUrl}
          alt={`Cover of ${book.title}`}
          width="60"
        />
      )}

      <div>
        <div><strong>{book.title}</strong></div>
        <div>{book.author}</div>
      </div>

      <button onClick={onDelete}>🗑️</button>
    </li>
  );
}

export default BookItem;

