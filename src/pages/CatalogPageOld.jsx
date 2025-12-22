import BookList from "../components/BookList";

function CatalogPage({ books, onDeleteBook }) {
  return (
    <>
      <h1>My Book Catalog</h1>

      {books.length === 0 ? (
        <p>No books yet. Use the search page to add some.</p>
      ) : (
        <BookList books={books} onDeleteBook={onDeleteBook} />
      )}
    </>
  );
}

export default CatalogPage;
