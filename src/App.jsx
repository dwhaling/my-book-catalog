import { useState, useEffect } from "react";
import BookList from "./components/BookList";
import { Routes, Route, Link } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";
import SearchPage from "./pages/SearchPage";
import { Navigate } from "react-router-dom";

function App() {
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");


  // save books to localStorage whenever 'books' state changes
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]); // run useEffect whenever 'books' changes

  function addBook(book) {
    setBooks((prevBooks) => [...prevBooks, book]);

    setFeedbackMessage(`"${book.title}" added to your catalog`);

    // Clear message after 2 seconds
    setTimeout(() => {
      setFeedbackMessage("");
    }, 2000);
  }

  function addBookFromSearch(apiBook) {
    addBook({
      title: apiBook.title,
      author: apiBook.author,
    });
  }

  function handleDeleteBook(indexToDelete) {
    const updatedBooks = books.filter((_, index) => index !== indexToDelete);
    setBooks(updatedBooks);
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();

    if (searchQuery.trim() === "") return;

    setIsSearching(true);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}`
      );

      const data = await response.json();

      const results = data.docs.slice(0, 10).map((doc) => {
        let coverUrl = null;

        if (doc.cover_edition_key) {
          coverUrl = `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-M.jpg`;
        } else if (doc.isbn && doc.isbn.length > 0) {
          coverUrl = `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-M.jpg`;
        }

        return {
          title: doc.title,
          author: doc.author_name ? doc.author_name[0] : "Unknown",
          coverUrl,
        };
      });


      setSearchResults(results);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsSearching(false);
    }
  }


  return (
    <div>
      <nav>
        <Link to="/catalog">My Catalog</Link> |{" "}
        <Link to="/search">Search</Link>
      </nav>

      {feedbackMessage && (
        <div style={{
          background: "#e6fffa",
          border: "1px solid #38b2ac",
          padding: "8px 12px",
          margin: "12px 0",
          borderRadius: "4px"
        }}>
          {feedbackMessage}
        </div>
      )}
      
      <Routes>
        <Route path="/" element={<Navigate to="/catalog" />} /> 
        <Route
          path="/catalog"
          element={
            <CatalogPage
              books={books}
              onDeleteBook={handleDeleteBook}
            />
          }
        />

        <Route
          path="/search"
          element={
            <SearchPage
              searchQuery={searchQuery}
              searchResults={searchResults}
              isSearching={isSearching}
              onSearchQueryChange={(e) =>
                setSearchQuery(e.target.value)
              }
              onSearchSubmit={handleSearchSubmit}
              onAddBook={addBook}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;


