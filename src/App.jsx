import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";
import SearchPage from "./pages/SearchPage";

function App() {
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem("books");
    const parsed = storedBooks ? JSON.parse(storedBooks) : [];

    // Normalize old books to support shelves
    return parsed.map((b) => ({
      shelves: [],
      ...b,
    }));
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeShelf, setActiveShelf] = useState("all");

  // Persist books
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]); // run useEffect whenever 'books' changes

  /* -------------------- HELPERS -------------------- */

  function booksAreSame(a, b) {
    if (a.isbn && b.isbn) {
      return a.isbn === b.isbn;
    }

    return (
      a.title.toLowerCase() === b.title.toLowerCase() &&
      a.author.toLowerCase() === b.author.toLowerCase()
    );
  }

  function bookHasShelf(book, shelf) {
    return book.shelves?.includes(shelf);
  }

  /* -------------------- BOOK ACTIONS -------------------- */

  function addBook(book) {
    setBooks((prevBooks) => {
      const exists = prevBooks.some((b) => booksAreSame(b, book));
      if (exists) return prevBooks;

      return [
        ...prevBooks,
        {
          ...book,
          shelves: [],
        },
      ];
    });
  }

  function handleDeleteBook(indexToDelete) {
    setBooks((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  }

  function toggleShelf(book, shelf) {
    setBooks((prevBooks) =>
      prevBooks.map((b) =>
        booksAreSame(b, book)
          ? {
              ...b,
              shelves: bookHasShelf(b, shelf)
                ? b.shelves.filter((s) => s !== shelf)
                : [...b.shelves, shelf],
            }
          : b
      )
    );
  }

  function isBookInCatalog(book) {
    return books.some((b) => booksAreSame(b, book));
  }

  /* -------------------- SEARCH -------------------- */

  async function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    setIsSearching(true);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          searchQuery
        )}`
      );

      const data = await response.json();

      const results = data.docs.slice(0, 10).map((doc) => {
        const isbn =
          doc.isbn && doc.isbn.length > 0 ? doc.isbn[0] : null;

        let coverUrl = null;
        if (isbn) {
          coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
        } else if (doc.cover_edition_key) {
          coverUrl = `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-M.jpg`;
        }

        return {
          title: doc.title,
          author: doc.author_name ? doc.author_name[0] : "Unknown",
          isbn,
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

  /* -------------------- FILTERING -------------------- */

  const visibleBooks =
    activeShelf === "all"
      ? books
      : books.filter((b) => b.shelves.includes(activeShelf));

  /* -------------------- ROUTES -------------------- */

  return (
    <div>
      <nav>
        <Link to="/catalog">My Catalog</Link> |{" "}
        <Link to="/search">Search</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/catalog" />} />

        <Route
          path="/catalog"
          element={
            <CatalogPage
              books={visibleBooks}
              allBooks={books}
              activeShelf={activeShelf}
              onShelfChange={setActiveShelf}
              onDeleteBook={handleDeleteBook}
              onToggleShelf={toggleShelf}
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
              isBookInCatalog={isBookInCatalog}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;