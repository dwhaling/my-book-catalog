import { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  // save books to localStorage whenever 'books' state changes
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]); // run useEffect whenever 'books' changes


  function handleSubmit(event) {
    event.preventDefault(); // tells browser to NOT perform the default submit behavior.

    if (title.trim() === "" || author.trim() === "") {
      return;
    }

    const newBook = {
      title: title,
      author: author,
    };

    setBooks([...books, newBook]);

    setTitle("");
    setAuthor("");
  }

  function handleDeleteBook(indexToDelete) {
    const updatedBooks = books.filter((_, index) => index !== indexToDelete);
    setBooks(updatedBooks);
  }


  return (
    <div>
      <h1>My Book Catalog</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <button>Add Book</button>
      </form>

      <ul>
        {books.map((book, index) => (
          <li key={index}>
            {book.title} — {book.author}
            <button onClick={() => handleDeleteBook(index)}>🗑️</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;


