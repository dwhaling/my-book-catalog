function Sidebar({ allBooks, activeShelf, onShelfChange }) {
  const totalCount = allBooks.length;

  const favoritesCount = allBooks.filter(
    (b) => b.shelves.includes("favorites")
  ).length;

  const wantCount = allBooks.filter(
    (b) => b.shelves.includes("want")
  ).length;

  const currentlyReadingCount = allBooks.filter(
    (b) => b.shelves.includes("currentlyReading")
  ).length;

  const readCount = allBooks.filter(
    (b) => b.shelves.includes("read")
  ).length;

  return (
    <aside className="sidebar">
      <div className="sidebarTitle">
        <span>Bookshelves</span>
        <button className="linkBtn">Edit</button>
      </div>

      <nav className="shelfList">
        <button
          className={`shelfItem ${activeShelf === "all" ? "active" : ""}`}
          onClick={() => onShelfChange("all")}
        >
          All ({totalCount})
        </button>

        <button
          className={`shelfItem ${activeShelf === "want" ? "active" : ""}`}
          onClick={() => onShelfChange("want")}
        >
          Want to Read ({wantCount})
        </button>

        <button
          className={`shelfItem ${
            activeShelf === "currentlyReading" ? "active" : ""
          }`}
          onClick={() => onShelfChange("currentlyReading")}
        >
          Currently Reading ({currentlyReadingCount})
        </button>

        <button
          className={`shelfItem ${activeShelf === "read" ? "active" : ""}`}
          onClick={() => onShelfChange("read")}
        >
          Read ({readCount})
        </button>

        <button
          className={`shelfItem ${
            activeShelf === "favorites" ? "active" : ""
          }`}
          onClick={() => onShelfChange("favorites")}
        >
          Favorites ({favoritesCount})
        </button>
      </nav>

      <button className="btnSmall">Add shelf</button>
    </aside>
  );
}

export default Sidebar;

