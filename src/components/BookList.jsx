import BookItem from "./BookItem";

function BookList({ books, onDeleteBook }) {
  return (
    <ul>
      {books.map((book, index) => (
        <BookItem
          key={index}
          book={book}
          onDelete={() => onDeleteBook(index)}
        />
      ))}
    </ul>
  );
}

export default BookList;
