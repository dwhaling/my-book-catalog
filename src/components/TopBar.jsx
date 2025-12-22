import { Link, useLocation } from "react-router-dom";

function TopBar() {
  const location = useLocation();

  return (
    <header className="topbar">
      <div className="brand">My Books</div>

      <div className="topbarSearch">
        <input className="searchInput" placeholder="Search and add books" />
        <span className="searchIcon">🔍</span>
      </div>

      <nav className="topbarNav">
        <Link className={location.pathname === "/catalog" ? "navLink active" : "navLink"} to="/catalog">
          Catalog
        </Link>
        <Link className={location.pathname === "/search" ? "navLink active" : "navLink"} to="/search">
          Search
        </Link>
        <button className="navLinkBtn">Settings</button>
      </nav>
    </header>
  );
}

export default TopBar;
